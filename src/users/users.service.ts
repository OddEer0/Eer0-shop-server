import { PrismaService } from './../prisma/prisma.service'
import { BadRequestException, ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { RolesService } from 'src/roles/roles.service'
import { TokenService } from 'src/token/token.service'
import { CreateUserDto } from './dto/createUser.dto'
import { FilesService } from 'src/files/files.service'
import { DirtyUserDto } from './dto/dirtyUser.dto'
import { BanUserDto } from './dto/banUser.dto'
import { USER_EXISTS, USER_NOT_FOUND, USER_OR_ROLE_NOT_FOUND } from './user.const'
import { Prisma } from '@prisma/client'
import { PureUserDto } from './dto/pureUser.dto'

@Injectable()
export class UsersService {
	constructor(
		private prismaService: PrismaService,
		private rolesService: RolesService,
		private tokenService: TokenService,
		private filesService: FilesService
	) {}

	async create(dto: CreateUserDto) {
		const candidate = await this.getUserByNickname(dto.nickname)
		if (candidate) {
			throw new BadRequestException(USER_EXISTS)
		}

		const role = await this.rolesService.getRolesByValue('ADMIN')

		const user = await this.prismaService.user.create({
			data: { ...dto, roles: { connect: { id: role.id } } },
			include: { roles: { select: { value: true } } }
		})

		return user
	}

	async getUserByNickname(nickname: string) {
		const user = await this.prismaService.user.findUnique({
			where: { nickname },
			include: { roles: { select: { value: true } } }
		})

		return user
	}

	async getAll(query: Prisma.UserFindManyArgs) {
		return await this.prismaService.user.findMany({
			...query
		})
	}

	async getOne(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			include: { roles: { select: { value: true } } }
		})
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND)
		}

		return user
	}

	async getUserById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			include: { roles: { select: { value: true } } }
		})

		return user
	}

	async delete(id: string) {
		await this.tokenService.deleteTokenByUserId(id)
		await this.prismaService.user.delete({ where: { id } })
		return `Пользователь с id ${id} был удалён`
	}

	async update(id: string, dto: DirtyUserDto) {
		const candidate = await this.prismaService.user.findUnique({ where: { id } })
		if (!candidate) {
			throw new NotFoundException(USER_NOT_FOUND)
		}

		const user = await this.prismaService.user.update({
			data: dto,
			where: { id },
			include: { roles: { select: { value: true } } }
		})
		return new PureUserDto(user)
	}

	async addUserAvatar(id: string, image: Express.Multer.File) {
		const user = await this.getUserById(id)
		if (!user) {
			throw new ForbiddenException(HttpStatus.BAD_REQUEST)
		}

		if (user.avatar) {
			await this.filesService.deleteFile(user.avatar.split('/').at(-1))
		}

		const fileName = await this.filesService.createFile(image, 1000, 1000)
		const newUser = await this.prismaService.user.update({
			where: { id },
			data: { avatar: fileName },
			include: { roles: { select: { value: true } } }
		})

		return new PureUserDto(newUser)
	}

	async banUser(id: string, banDto: BanUserDto) {
		const isHave = await this.getUserById(id)

		if (isHave.isBanned) {
			throw new ForbiddenException(HttpStatus.BAD_REQUEST)
		}

		const user = await this.prismaService.user.update({
			where: { id },
			data: { isBanned: true, banReason: banDto.banReason }
		})

		return new PureUserDto(user)
	}

	async unbanUser(id) {
		const isHave = await this.getUserById(id)

		if (!isHave.isBanned) {
			throw new ForbiddenException(HttpStatus.BAD_REQUEST)
		}

		const user = await this.prismaService.user.update({
			where: { id },
			data: { isBanned: false, banReason: null }
		})

		return new PureUserDto(user)
	}

	async addRole(id: string, roleName: string) {
		const role = await this.rolesService.getRolesByValue(roleName)

		const user = await this.getUserById(id)

		if (!role && !user) {
			throw new NotFoundException(USER_OR_ROLE_NOT_FOUND)
		}

		return await this.prismaService.user.update({ where: { id }, data: { roles: { connect: { id: role.id } } } })
	}
}
