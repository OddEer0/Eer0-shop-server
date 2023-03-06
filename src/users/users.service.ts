import { Injectable } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common/exceptions'
import { InjectModel } from '@nestjs/sequelize'
import { PureUserDto } from 'src/common/dto/pureUser.dto'
import { Role } from 'src/roles/roles.model'
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
		const user = await this.userModel.findOne({
			where: { nickname },
			include: { model: Role, through: { attributes: [] }, attributes: ['value'] }
		})
		return user
	}

	async getAll() {
		return await this.userModel.findAll({
			include: { model: Role, through: { attributes: [] }, attributes: ['value', 'description'] }
		})
	}

	async getUserByAccessToken(accessToken: string) {
		if (!accessToken) {
			throw new UnauthorizedException()
		}

		const userData = await this.tokenService.parseAccessToken(accessToken)
		const user = await this.getUserById(userData.id)
		const pureUser = new PureUserDto(user)

		return pureUser
	}

	async getUserById(id: string) {
		const user = await this.userModel.findOne({
			where: { id },
			include: { model: Role, through: { attributes: [] }, attributes: ['value'] }
		})
		return user
	}

	async deleteUser(id: string) {
		await this.tokenService.deleteTokenByUserId(id)
		await this.userModel.destroy({ where: { id } })
		return `Пользователь с id ${id} был удалён`
	}
}
