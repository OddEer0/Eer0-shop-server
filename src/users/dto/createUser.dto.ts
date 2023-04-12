import { IsString, IsEmail, IsNotEmpty } from 'class-validator'
import { TypeValidation } from '@/common/constants/validation'

export class CreateUserDto {
	@IsEmail()
	readonly email: string

	@IsNotEmpty({ message: TypeValidation.IS_NOT_EMPTY })
	@IsString({ message: TypeValidation.IS_STRING })
	readonly nickname: string

	@IsNotEmpty({ message: TypeValidation.IS_NOT_EMPTY })
	@IsString({ message: TypeValidation.IS_STRING })
	readonly password: string

	@IsNotEmpty({ message: TypeValidation.IS_NOT_EMPTY })
	@IsString({ message: TypeValidation.IS_STRING })
	readonly firstName: string

	@IsNotEmpty({ message: TypeValidation.IS_NOT_EMPTY })
	@IsString({ message: TypeValidation.IS_STRING })
	readonly lastName: string

	@IsNotEmpty({ message: TypeValidation.IS_NOT_EMPTY })
	@IsString({ message: TypeValidation.IS_STRING })
	readonly activationLink: string
}
