import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/users/users.model'
import { RolesController } from './roles.controller'
import { Role } from './roles.model'
import { RolesService } from './roles.service'
import { UserRoles } from './userRoles.model'

@Module({
	controllers: [RolesController],
	providers: [RolesService],
	imports: [SequelizeModule.forFeature([User, Role, UserRoles])],
	exports: [RolesService]
})
export class RolesModule {}
