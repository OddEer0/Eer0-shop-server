import { RoleEnum } from '@/common/types/Roles'
import { Role } from '@prisma/client'

export class PureUserDto {
	readonly id: string
	readonly email: string
	readonly nickname: string
	readonly firstName: string
	readonly lastName: string
	readonly birthday: number | null
	readonly isActivate: boolean
	readonly isBanned: boolean
	readonly avatar: string | null
	readonly subTitle: string | null
	readonly banReason: string | null
	readonly roles: Role[]
	readonly isAdmin: boolean
	readonly isDeveloper: boolean
	readonly isEmployee: boolean
	readonly isModerator: boolean

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
		this.avatar = user.avatar
		this.roles = user.roles.map(role => role.value)
		this.isAdmin = user.roles.some(role => role.value === RoleEnum.admin)
		this.isDeveloper = user.roles.some(role => role.value === RoleEnum.developer)
		this.isEmployee = user.roles.some(role => role.value === RoleEnum.employee)
		this.isModerator = user.roles.some(role => role.value === RoleEnum.moderator)
	}
}
