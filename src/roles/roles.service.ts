import { PrismaService } from './../prisma/prisma.service'
import { BadRequestException, ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { CreateRoleDto } from './dto/createRoleDto'
import { ROLE_EXISTS, ROLE_NOT_FOUND } from './roles.const'

@Injectable()
export class RolesService {
	constructor(private prismaService: PrismaService) {}

	async create(dto: CreateRoleDto) {
		const candidate = await this.prismaService.role.findUnique({ where: { value: dto.value } })
		if (candidate) {
			throw new BadRequestException(ROLE_EXISTS)
		}
		return await this.prismaService.role.create({ data: dto })
	}

	async getAll() {
		const roles = await this.prismaService.role.findMany()
		return roles
	}

	async delete(id: string) {
		await this.prismaService.role.delete({ where: { id } })
		return `Роль с данным id ${id} был удален`
	}

	async getOne(id: string) {
		const role = await this.prismaService.role.findUnique({ where: { id } })
		if (!role) {
			throw new NotFoundException(ROLE_NOT_FOUND)
		}

		return role
	}

	async getRolesByValue(value: string) {
		const role = await this.prismaService.role.findUnique({ where: { value } })

		return role
	}
}
