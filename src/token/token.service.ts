import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt/dist'
import { PrismaService } from 'src/prisma/prisma.service'
import { SaveTokenDto } from './dto/saveToken.dto'
import { IJwtUserPayload } from '@/common/types/jwt.types'
import { GenerateTokenDto } from './dto/generateToken.dto'

@Injectable()
export class TokenService {
	constructor(
		private prismaService: PrismaService,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	generateToken(user: GenerateTokenDto) {
		const payload = { id: user.id, roles: user.roles.map(role => role.value) }
		return {
			accessToken: this.jwtService.sign(payload, {
				secret: this.configService.get('ACCESS_SECRET_KEY'),
				expiresIn: '1h'
			}),
			refreshToken: this.jwtService.sign(payload, {
				secret: this.configService.get('REFRESH_SECRET_KEY'),
				expiresIn: '30d'
			})
		}
	}

	async saveToken(dto: SaveTokenDto) {
		const tokenData = await this.prismaService.token.findUnique({ where: { userId: dto.userId } })
		if (tokenData) {
			return await this.prismaService.token.update({
				where: { userId: tokenData.userId },
				data: { refreshToken: dto.refreshToken }
			})
		}

		const token = await this.prismaService.token.create({ data: dto })
		return token
	}

	async deleteTokenByUserId(userId: string) {
		await this.prismaService.token.delete({ where: { userId } })
	}

	async findRefreshToken(refreshToken) {
		return await this.prismaService.token.findUnique({ where: { refreshToken } })
	}

	async nullRefreshToken(refreshToken: string) {
		return this.prismaService.token.update({ where: { refreshToken }, data: { refreshToken: null } })
	}

	validateRefreshToken(token: string) {
		return this.jwtService.verify<IJwtUserPayload>(token, { secret: this.configService.get('REFRESH_SECRET_KEY') })
	}

	parseAccessToken(token: string) {
		return this.jwtService.decode(token) as IJwtUserPayload
	}

	validateAccessToken(token: string) {
		return this.jwtService.verify<IJwtUserPayload>(token, { secret: this.configService.get('ACCESS_SECRET_KEY') })
	}
}
