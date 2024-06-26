import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import { TokenService } from 'src/token/token.service'
import { AuthLoginDto } from './dto/authLogin.dto'
import { EMAIL_OR_PASSWORD_INCORRECT } from './auth.const'
import { UNAUTHORIZED } from '@/common/constants/status'
import { AuthRegistrationDto } from './dto/authRegistration.dto'
import { PureUserDto } from 'src/users/dto/pureUser.dto'

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private tokenService: TokenService) {}

	async registration(userDto: AuthRegistrationDto) {
		const hashPassword = await bcrypt.hash(userDto.password, 5)
		const link: string = uuid.v4()

		const user = await this.usersService.create({ ...userDto, password: hashPassword, activationLink: link })

		const tokens = this.tokenService.generateToken(user)
		await this.tokenService.saveToken({ userId: user.id, refreshToken: tokens.refreshToken })

		const pureUser = new PureUserDto(user)

		return { user: pureUser, tokens }
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
		return { user: pureUser, tokens }
	}

	async logout(refreshToken: string) {
		if (!refreshToken) {
			throw new UnauthorizedException()
		}
		await this.tokenService.nullRefreshToken(refreshToken)
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw new UnauthorizedException(UNAUTHORIZED)
		}

		const userData = this.tokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await this.tokenService.findRefreshToken(refreshToken)

		if (!userData || !tokenFromDb) {
			throw new UnauthorizedException(UNAUTHORIZED)
		}

		const user = await this.usersService.getUserById(userData.id)
		const tokens = await this.tokenService.generateToken(user)
		await this.tokenService.saveToken({ refreshToken: tokens.refreshToken, userId: user.id })

		const pureUser = new PureUserDto(user)

		return { user: pureUser, tokens }
	}
}
