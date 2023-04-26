import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard, IAuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-auth') implements IAuthGuard {
	canActivate(context: ExecutionContext) {
		return super.canActivate(context)
	}
}
