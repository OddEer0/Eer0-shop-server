import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateRoleDto } from './dto/createRoleDto'
import { RolesService } from './roles.service'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'
import { AddRoleDto } from '../users/dto/addRole.dto'

@Controller('roles')
export class RolesController {
	constructor(private roleService: RolesService) {}

	@Roles(RoleEnum.admin, RoleEnum.developer)
	@Post()
	createRole(@Body() dto: CreateRoleDto) {
		return this.roleService.createRole(dto)
	}

	@Roles(RoleEnum.admin, RoleEnum.developer)
	@Get()
	getAllRole() {
		return this.roleService.getAllRole()
	}

	@Roles(RoleEnum.admin, RoleEnum.developer)
	@Delete(':id')
	deleteRole(@Param('id') id: string) {
		return this.roleService.deleteRole(id)
	}
}
