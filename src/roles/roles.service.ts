import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateRoleDto } from './dto/createRoleDto'
import { Role } from './roles.model'

@Injectable()
export class RolesService {
	constructor(@InjectModel(Role) private roleModel: typeof Role) {}

	async getRolesByValue(value: string) {
		const role = await this.roleModel.findOne({ where: { value } })
		return role
	}

	async createRole(dto: CreateRoleDto) {
		const role = await this.roleModel.create(dto)
		return role
	}

	async getAllRole() {
		const roles = await this.roleModel.findAll()
		return roles
	}

	async deleteRole(id: string) {
		await this.roleModel.destroy({ where: { id } })
		return `Роль с данным id ${id} был удален`
	}
}
