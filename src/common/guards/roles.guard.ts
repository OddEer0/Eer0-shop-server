import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { ROLES_KEY } from '../decorators/rolesAuth.decorator'
import { Request } from 'express'
import { RoleValidation } from '../constants/validation'
import { ConfigService } from '@nestjs/config'
import { UNAUTHORIZED } from '../constants/status'
import { IJwtUserPayload } from '../types/jwt.types'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector, private configService: ConfigService) {}

	async canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest() as Request
		const token = this.extractTokenFromHeader(req)

		try {
			const reqRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
			if (!reqRoles) {
				return true
			}

			const user = await this.jwtService.verifyAsync<IJwtUserPayload>(token, {
				secret: this.configService.get('ACCESS_SECRET_KEY')
			})

			req.user = user
			if (user.roles.some(role => reqRoles.includes(role))) {
				return true
			} else {
				throw new ForbiddenException(RoleValidation.NOT_ACCESS)
			}
		} catch (error) {
			throw new ForbiddenException(RoleValidation.NOT_ACCESS)
		}
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const token = request.cookies.accessToken

		if (!token) {
			throw new UnauthorizedException(UNAUTHORIZED)
		}

		return token
	}
}
