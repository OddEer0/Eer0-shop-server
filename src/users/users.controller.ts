import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { UsersService } from './users.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'
import { RolesOrAuthor } from '@/common/decorators/rolesOrAuthor.decorator'
import { BanUserDto } from './dto/banUser.dto'
import { AddRoleDto } from './dto/addRole.dto'
import { TransformGetAllUsersPipe } from './pipes/TransformGetAllUsers.pipe'
import { Prisma } from '@prisma/client'
import { DirtyUserDto } from '@/common/dtos/user/dirtyUser.dto'

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Roles(RoleEnum.admin, RoleEnum.developer)
	@Get()
	getAllUsers(@Query(TransformGetAllUsersPipe) query: Prisma.UserFindManyArgs) {
		return this.usersService.getAll(query)
	}

	@RolesOrAuthor(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator)
	@Delete(':id')
	deleteUser(@Param('id') id: string) {
		return this.usersService.deleteUser(id)
	}

	@Roles(RoleEnum.moderator, RoleEnum.admin, RoleEnum.developer)
	@Get(':id')
	getOneUser(@Param('id') id: string) {
		return this.usersService.getUserById(id)
	}

	@RolesOrAuthor(RoleEnum.moderator, RoleEnum.admin, RoleEnum.developer)
	@Put(':id')
	updateUser(@Param('id') id: string, @Body() dto: DirtyUserDto) {
		return this.usersService.updateUser(id, dto)
	}

	@RolesOrAuthor(RoleEnum.moderator, RoleEnum.admin, RoleEnum.developer)
	@Put('avatar/:id')
	@UseInterceptors(FileInterceptor('image'))
	addUserAvatar(@Param('id') id: string, @UploadedFile() image: Express.Multer.File) {
		return this.usersService.addUserAvatar(id, image)
	}

	@Roles(RoleEnum.moderator, RoleEnum.admin, RoleEnum.developer)
	@Post('ban/:id')
	banUser(@Param('id') id: string, @Body() dto: BanUserDto) {
		return this.usersService.banUser(id, dto)
	}

	@Roles(RoleEnum.moderator, RoleEnum.admin, RoleEnum.developer)
	@Post('unban/:id')
	unbanUser(@Param('id') id: string) {
		return this.usersService.unbanUser(id)
	}

	@Roles(RoleEnum.admin, RoleEnum.developer)
	@Post('role')
	addRole(@Body() dto: AddRoleDto) {
		return this.usersService.addRole(dto.userId, dto.roleName)
	}
}
