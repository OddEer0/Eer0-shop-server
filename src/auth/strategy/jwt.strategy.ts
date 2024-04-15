import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IJwtUserPayload } from '@/common/types/jwt.types'
import { UsersService } from 'src/users/users.service'
import { UNAUTHORIZED } from '@/common/constants/status'
import { cookieExtractors } from '@/common/helpers/extractors'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
	constructor(configService: ConfigService, private userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractors]),
			ignoreExpiration: false,
			secretOrKey: configService.get('ACCESS_SECRET_KEY')
		})
	}

	async validate(payload: IJwtUserPayload) {
		const user = await this.userService.getUserById(payload.id)

		if (!user) {
			throw new UnauthorizedException(UNAUTHORIZED)
		}

		return user
	}
}
