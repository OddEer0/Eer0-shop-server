import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class SaveTokenDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly userId: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly refreshToken: string
}
