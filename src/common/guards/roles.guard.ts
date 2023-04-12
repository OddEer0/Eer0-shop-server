import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { ROLES_KEY } from '../decorators/rolesAuth.decorator'
import { IJwtPayload } from '../types/IJwtPayload'
import { Request } from 'express'
import { RoleValidation } from '../constants/validation'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const reqRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
			if (!reqRoles) {
				return true
			}
			const req = context.switchToHttp().getRequest()
			const token = this.extractTokenFromHeader(req)

			const user = this.jwtService.verify<IJwtPayload>(token)
			req.user = user
			return user.roles.some(role => reqRoles.includes(role))
		} catch (error) {
			throw new HttpException(RoleValidation.NOT_ACCESS, HttpStatus.FORBIDDEN)
		}
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []

		if (!token && type !== 'Bearer') {
			throw new HttpException(RoleValidation.NOT_ACCESS, HttpStatus.FORBIDDEN)
		}

		return token
	}
}
