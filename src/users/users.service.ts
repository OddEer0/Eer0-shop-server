import { PrismaService } from './../prisma/prisma.service'
import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common'
import { RolesService } from 'src/roles/roles.service'
import { TokenService } from 'src/token/token.service'
import { CreateUserDto } from './dto/createUser.dto'
import { User } from '@prisma/client'
import { UpdateDtoTransformDto } from './dto/updateDtoTransform.dto'
import { PureUserDto } from 'src/common/dto/pureUser.dto'
import { FilesService } from 'src/files/files.service'

@Injectable()
export class UsersService {
	constructor(
		private prismaService: PrismaService,
		private rolesService: RolesService,
		private tokenService: TokenService,
		private filesService: FilesService
	) {}

	async createUser(dto: CreateUserDto) {
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

	async getAll() {
		return await this.prismaService.user.findMany({
			include: { roles: { select: { value: true, description: true } } }
		})
	}

	async getUserById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			include: { roles: { select: { value: true } } }
		})
		return user
	}

	async deleteUser(id: string) {
		await this.tokenService.deleteTokenByUserId(id)
		await this.prismaService.user.delete({ where: { id } })
		return `Пользователь с id ${id} был удалён`
	}

	async updateUser(id: string, dto: User) {
		const user = await this.prismaService.user.findUnique({ where: { id } })

		if (!user) {
			throw new ForbiddenException(HttpStatus.BAD_REQUEST)
		}

		const transformUser = new UpdateDtoTransformDto(dto)

		const newUser = await this.prismaService.user.update({
			data: { ...user, ...transformUser },
			where: { id },
			include: { roles: { select: { value: true } } }
		})
		return new PureUserDto(newUser)
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
}
