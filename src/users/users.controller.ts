import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards/jwtAuthGuard.guard'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	getAllUsers() {
		return this.usersService.getAll()
	}

	@Delete(':id')
	deleteUser(@Param('id') id: string) {
		return this.usersService.deleteUser(id)
	}
}
