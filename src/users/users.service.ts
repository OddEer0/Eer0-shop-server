import { PrismaService } from './../prisma/prisma.service'
import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common'
import { RolesService } from 'src/roles/roles.service'
import { TokenService } from 'src/token/token.service'
import { CreateUserDto } from './dto/createUser.dto'
import { PureUserDto } from '@/common/dtos/user/pureUser.dto'
import { FilesService } from 'src/files/files.service'
import { DirtyUserDto } from '../common/dtos/user/dirtyUser.dto'
import { BanUserDto } from './dto/banUser.dto'

@Injectable()
export class UsersService {
	constructor(
		private prismaService: PrismaService,
		private rolesService: RolesService,
		private tokenService: TokenService,
		private filesService: FilesService
	) {}

	async createUser(dto: CreateUserDto) {
		const role = await this.rolesService.getRolesByValue('USER')
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

	async updateUser(id: string, dto: DirtyUserDto) {
		const user = await this.prismaService.user.findUnique({ where: { id } })

		if (!user) {
			throw new ForbiddenException(HttpStatus.BAD_REQUEST)
		}

		const newUser = await this.prismaService.user.update({
			data: { ...user, ...dto },
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

	async banUser(id: string, banDto: BanUserDto) {
		const isHave = await this.prismaService.user.findUnique({
			where: { id }
		})

		if (!isHave) {
			throw new ForbiddenException(HttpStatus.BAD_REQUEST)
		}

		const user = await this.prismaService.user.update({
			where: { id },
			data: { isBanned: true, banReason: banDto.banReason }
		})

		return new PureUserDto(user)
	}

	async unbanUser(id) {
		const isHave = await this.prismaService.user.findUnique({
			where: { id }
		})

		if (!isHave) {
			throw new ForbiddenException(HttpStatus.BAD_REQUEST)
		}

		if (!isHave.isBanned) {
			throw new ForbiddenException(HttpStatus.BAD_REQUEST)
		}

		const user = await this.prismaService.user.update({
			where: { id },
			data: { isBanned: false, banReason: null }
		})

		return new PureUserDto(user)
	}
}
