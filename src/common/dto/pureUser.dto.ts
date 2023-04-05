import { Role } from '@prisma/client'

export class PureUserDto {
	id: string
	email: string
	nickname: string
	firstName: string
	lastName: string
	birthday: number | null
	isActivate: boolean
	isBanned: boolean
	subTitle: string | null
	banReason: string | null
	roles: Role[]

	constructor(user) {
		this.id = user.id
		this.email = user.email
		this.banReason = user.banReason
		this.birthday = Date.parse(user.birthday)
		this.firstName = user.firstName
		this.lastName = user.lastName
		this.nickname = user.nickname
		this.isActivate = user.isActivate
		this.isBanned = user.isBanned
		this.subTitle = user.subTitle
		this.roles = user.roles.map(role => role.value)
	}
}
