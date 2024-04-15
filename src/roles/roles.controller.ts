import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateRoleDto } from './dto/createRoleDto'
import { RolesService } from './roles.service'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'
import { AddRoleDto } from '../users/dto/addRole.dto'

@Controller('roles')
export class RolesController {
	constructor(private roleService: RolesService) {}

	@Post()
	createRole(@Body() dto: CreateRoleDto) {
		return this.roleService.create(dto)
	}

	@Roles(RoleEnum.admin, RoleEnum.developer)
	@Get()
	getAllRole() {
		return this.roleService.getAll()
	}

	@Roles(RoleEnum.admin, RoleEnum.developer)
	@Delete(':id')
	deleteRole(@Param('id') id: string) {
		return this.roleService.delete(id)
	}
}
