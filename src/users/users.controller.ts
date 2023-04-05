import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards/jwtAuthGuard.guard'
import { UsersService } from './users.service'
import { User } from '@prisma/client'

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	// @UseGuards(JwtAuthGuard)
	@Get()
	getAllUsers() {
		return this.usersService.getAll()
	}

	@Delete(':id')
	deleteUser(@Param('id') id: string) {
		return this.usersService.deleteUser(id)
	}

	@Get(':id')
	getOneUser(@Param('id') id: string) {
		return this.usersService.getUserById(id)
	}

	@Put(':id')
	updateUser(@Param('id') id: string, @Body() user: User) {
		return this.usersService.updateUser(id, user)
	}
}
