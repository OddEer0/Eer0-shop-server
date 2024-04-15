import { IsString, IsEmail } from 'class-validator'
import { TypeValidation } from '@/common/constants/validation'

export class CreateUserDto {
	@IsEmail()
	readonly email: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly nickname: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly password: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly firstName: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly lastName: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly activationLink: string
}
