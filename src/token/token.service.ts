import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt/dist'
import { InjectModel } from '@nestjs/sequelize'
import { User } from 'src/users/users.model'
import { SaveTokenDto } from './dto/saveToken.dto'
import { Token } from './token.model'

@Injectable()
export class TokenService {
	constructor(@InjectModel(Token) private tokenModel: typeof Token, private jwtService: JwtService) {}

	generateToken(user: User) {
		const payload = { id: user.id, nickname: user.nickname, roles: user.roles }
		return {
			accessToken: this.jwtService.sign(payload, { secret: process.env.ACCESS_SECRET_KEY, expiresIn: '15m' }),
			refreshToken: this.jwtService.sign(payload, { secret: process.env.REFRESH_SECRET_KEY, expiresIn: '30d' })
		}
	}

	async saveToken(dto: SaveTokenDto) {
		const tokenData = await this.tokenModel.findByPk(dto.userId)
		if (tokenData) {
			tokenData.refreshToken = dto.refreshToken
			return tokenData.save()
		}

		const token = await this.tokenModel.create(dto)
		return token
	}

	async deleteTokenByUserId(userId: string) {
		await this.tokenModel.destroy({ where: { userId } })
	}

	async findRefreshToken(refreshToken) {
		return await this.tokenModel.findOne({ where: { refreshToken } })
	}

	async nullRefreshToken(refreshToken: string) {
		const tokenData = await this.findRefreshToken(refreshToken)
		tokenData.refreshToken = null
		return tokenData.save()
	}

	validateRefreshToken(token: string) {
		return this.jwtService.verify(token, { secret: process.env.REFRESH_SECRET_KEY })
	}

	validateAccessToken(token: string) {
		return this.jwtService.verify(token, { secret: process.env.ACCESS_SECRET_KEY })
	}
}
