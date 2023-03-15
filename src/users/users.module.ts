import { Module } from '@nestjs/common'
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy'
import { RolesModule } from 'src/roles/roles.module'
import { TokenModule } from 'src/token/token.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
	controllers: [UsersController],
	providers: [UsersService, JwtStrategy],
	imports: [PrismaModule, RolesModule, TokenModule],
	exports: [UsersService]
})
export class UsersModule {}
