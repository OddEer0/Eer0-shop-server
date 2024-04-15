import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class AddDeviceToCartDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly deviceId: string
}
