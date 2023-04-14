import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard, IAuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-auth') implements IAuthGuard {
	constructor() {
		super()
	}

	canActivate(context: ExecutionContext) {
		return super.canActivate(context)
	}
}
