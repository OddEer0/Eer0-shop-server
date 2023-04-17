import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class RemoveDeviceFromCartDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly deviceId: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly userId: string
}
