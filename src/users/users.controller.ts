import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards/jwtAuthGuard.guard'
import { UsersService } from './users.service'
import { Request } from 'express'

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	getAllUsers() {
		return this.usersService.getAll()
	}

	@UseGuards(JwtAuthGuard)
	@Get('/profile')
	getProfile(@Req() req: Request) {
		const { accessToken } = req.cookies
		return this.usersService.getUserByAccessToken(accessToken)
	}

	@Delete(':id')
	deleteUser(@Param('id') id: string) {
		return this.usersService.deleteUser(id)
	}
}
