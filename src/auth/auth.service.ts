import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/createUser.dto'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import { TokenService } from 'src/token/token.service'
import { AuthLoginDto } from './dto/authLogin.dto'
import { EMAIL_OR_PASSWORD_INCORRECT, USER_EXISTS } from './auth.const'
import { PureUserDto } from '../common/dto/pureUser.dto'

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private tokenService: TokenService) {}

	async registration(userDto: CreateUserDto) {
		const candidate = await this.usersService.getUserByNickname(userDto.nickname)
		if (candidate) {
			throw new HttpException(USER_EXISTS, HttpStatus.BAD_REQUEST)
		}

		const hashPassword = await bcrypt.hash(userDto.password, 5)
		const link: string = uuid.v4()

		await this.usersService.createUser({ ...userDto, password: hashPassword, activationLink: link })
		const user = await this.usersService.getUserByNickname(userDto.nickname)

		const tokens = this.tokenService.generateToken(user)
		await this.tokenService.saveToken({ userId: user.id, refreshToken: tokens.refreshToken })

		const pureUser = new PureUserDto(user)

		return { tokens, user: pureUser }
	}

	async login(dto: AuthLoginDto) {
		const user = await this.usersService.getUserByNickname(dto.nickname)
		if (!user) {
			throw new ForbiddenException(EMAIL_OR_PASSWORD_INCORRECT)
		}
		const isEquals = await bcrypt.compare(dto.password, user.password)
		if (!isEquals) {
			throw new ForbiddenException(EMAIL_OR_PASSWORD_INCORRECT)
		}

		const tokens = this.tokenService.generateToken(user)
		await this.tokenService.saveToken({ refreshToken: tokens.refreshToken, userId: user.id })

		const pureUser = new PureUserDto(user)
		return { tokens, user: pureUser }
	}

	async logout(refreshToken: string) {
		if (!refreshToken) {
			throw new UnauthorizedException()
		}
		this.tokenService.nullRefreshToken(refreshToken)
	}

	async refresh(refreshToken: string) {
		console.log(refreshToken)
		if (!refreshToken) {
			throw new UnauthorizedException('Не авторизован')
		}

		const userData = this.tokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = this.tokenService.findRefreshToken(refreshToken)

		if (!userData || !tokenFromDb) {
			throw new UnauthorizedException('Не авторизован')
		}

		const user = await this.usersService.getUserByNickname(userData.nickname)
		const tokens = await this.tokenService.generateToken(user)
		await this.tokenService.saveToken({ refreshToken: tokens.refreshToken, userId: user.id })

		const pureUser = new PureUserDto(user)

		return { tokens, user: pureUser }
	}
}
