import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class AuthLoginDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly nickname: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly password: string
}
