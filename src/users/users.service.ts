import { PrismaService } from './../prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { RolesService } from 'src/roles/roles.service'
import { TokenService } from 'src/token/token.service'
import { CreateUserDto } from './dto/createUser.dto'

@Injectable()
export class UsersService {
	constructor(
		private prismaService: PrismaService,
		private rolesService: RolesService,
		private tokenService: TokenService
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.prismaService.user.create({ data: dto })
		const role = await this.rolesService.getRolesByValue('ADMIN')
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
}
