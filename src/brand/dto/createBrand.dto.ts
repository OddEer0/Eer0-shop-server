import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class CreateBrandDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly name: string
}
