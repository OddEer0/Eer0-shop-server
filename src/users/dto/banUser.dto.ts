import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class BanUserDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly banReason: string
}
