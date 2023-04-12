import { User } from '@prisma/client'

export class DirtyUserDto {
	readonly id: string
	readonly nickname: string
	readonly email: string
	readonly avatar: null | string
	readonly firstName: string
	readonly lastName: string
	readonly birthday: null | Date
	readonly subTitle: null | string

	constructor(data: User) {
		this.id = data.id
		this.nickname = data.nickname
		this.email = data.email
		this.avatar = data.avatar
		this.firstName = data.firstName
		this.lastName = data.lastName
		this.birthday = typeof data.birthday === 'number' ? new Date(data.birthday) : data.birthday
		this.subTitle = data.subTitle
	}
}
