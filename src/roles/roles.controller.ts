import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateRoleDto } from './dto/createRoleDto'
import { RolesService } from './roles.service'

@Controller('roles')
export class RolesController {
	constructor(private roleService: RolesService) {}

	@Post()
	createRole(@Body() dto: CreateRoleDto) {
		return this.roleService.createRole(dto)
	}

	@Get()
	getAllRole() {
		return this.roleService.getAllRole()
	}

	@Delete(':id')
	deleteRole(@Param('id') id: string) {
		return this.roleService.deleteRole(id)
	}
}
