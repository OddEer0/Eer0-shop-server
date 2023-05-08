import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class GenerateTokenDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly id: string

	readonly roles: { value: string }[]
}
