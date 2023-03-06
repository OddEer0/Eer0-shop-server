import { forwardRef, Module } from '@nestjs/common'
import { TokenModule } from 'src/token/token.module'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	imports: [forwardRef(() => UsersModule), TokenModule]
})
export class AuthModule {}
