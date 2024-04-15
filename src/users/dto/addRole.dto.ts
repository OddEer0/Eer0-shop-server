import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class AddRoleDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly roleName: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly userId: string
}
