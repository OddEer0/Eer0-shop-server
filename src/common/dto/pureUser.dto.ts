import { Role } from 'src/roles/roles.model'

export class PureUserDto {
	id: string
	email: string
	nickname: string
	firstName: string
	lastName: string
	birthday: Date | null
	isActivate: boolean
	isBanned: boolean
	banReason: string | null
	roles: Role[]

	constructor(user) {
		this.id = user.id
		this.email = user.email
		this.banReason = user.banReason
		this.birthday = user.birthday
		this.firstName = user.firstName
		this.lastName = user.lastName
		this.nickname = user.nickname
		this.isActivate = user.isActivate
		this.isBanned = user.isBanned
		this.roles = user.roles.map(role => role.value)
	}
}
