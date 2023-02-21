export class CreateUserDto {
	readonly email: string
	readonly nickname: string
	readonly password: string
	readonly firstName: string
	readonly lastName: string
	readonly activationLink: string
}
