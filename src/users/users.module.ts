import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy'
import { Role } from 'src/roles/roles.model'
import { RolesModule } from 'src/roles/roles.module'
import { UserRoles } from 'src/roles/userRoles.model'
import { TokenModule } from 'src/token/token.module'
import { UsersController } from './users.controller'
import { User } from './users.model'
import { UsersService } from './users.service'

@Module({
	controllers: [UsersController],
	providers: [UsersService, JwtStrategy],
	imports: [RolesModule, TokenModule, SequelizeModule.forFeature([Role, User, UserRoles])],
	exports: [UsersService]
})
export class UsersModule {}
