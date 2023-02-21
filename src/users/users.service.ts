import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from 'src/roles/roles.service'
import { TokenService } from 'src/token/token.service'
import { CreateUserDto } from './dto/createUser.dto'
import { User } from './users.model'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userModel: typeof User,
		private rolesService: RolesService,
		private tokenService: TokenService
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.userModel.create(dto)
		const role = await this.rolesService.getRolesByValue('ADMIN')
		await user.$set('roles', [role.id])
		return user
	}

	async getUserByNickname(nickname: string) {
		const user = await this.userModel.findOne({ where: { nickname } })
		return user
	}

	async getAll() {
		return await this.userModel.findAll()
	}

	async deleteUser(id: string) {
		await this.tokenService.deleteTokenByUserId(id)
		await this.userModel.destroy({ where: { id } })
		return `Пользователь с id ${id} был удалён`
	}
}
