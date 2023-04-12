import { PrismaService } from './../prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/createRoleDto'

@Injectable()
export class RolesService {
	constructor(private prismaService: PrismaService) {}

	async getRolesByValue(value: string) {
		const role = await this.prismaService.role.findUnique({ where: { value } })
		return role
	}

	async createRole(dto: CreateRoleDto) {
		const role = await this.prismaService.role.create({ data: dto })
		return role
	}

	async getAllRole() {
		const roles = await this.prismaService.role.findMany()
		return roles
	}

	async deleteRole(id: string) {
		await this.prismaService.role.delete({ where: { id } })
		return `Роль с данным id ${id} был удален`
	}
}
