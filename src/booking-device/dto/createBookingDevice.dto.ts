import { TypeValidation } from '@/common/constants/validation'
import { IsNumber, IsString } from 'class-validator'

export class CreateBookingDeviceDto {
	@IsNumber({}, { message: TypeValidation.IS_NUMBER })
	readonly count: number

	@IsString({ message: TypeValidation.IS_STRING })
	readonly userId: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly deviceId: string
}

export class CreateManyBookingDeviceDto {}
