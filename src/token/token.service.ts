import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt/dist'
import { IJwtPayload } from 'src/auth/types/jwtPayload.types'
import { PrismaService } from 'src/prisma/prisma.service'
import { SaveTokenDto } from './dto/saveToken.dto'

@Injectable()
export class TokenService {
	constructor(
		private prismaService: PrismaService,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	generateToken(user: any) {
		const payload = { id: user.id, roles: user.roles.map(role => role.value) } // make dto
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
				data: { ...tokenData, refreshToken: dto.refreshToken }
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
		return this.jwtService.verify(token, { secret: process.env.REFRESH_SECRET_KEY })
	}

	parseAccessToken(token: string) {
		return this.jwtService.decode(token) as IJwtPayload
	}

	validateAccessToken(token: string) {
		return this.jwtService.verify(token, { secret: process.env.ACCESS_SECRET_KEY })
	}
}
