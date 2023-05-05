import { TypeValidation } from '@/common/constants/validation'
import { IsString } from 'class-validator'

export class UpdateBookingDeviceDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly id: string
	readonly count?: number
	readonly price?: number
	readonly stock?: number
	readonly userId?: string
	readonly deviceId?: string
}
