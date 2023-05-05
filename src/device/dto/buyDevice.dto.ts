import { TypeValidation } from '@/common/constants/validation'
import { IsNumber, IsString } from 'class-validator'

export class BuyDeviceDtoController {
	@IsNumber({}, { message: TypeValidation.IS_NUMBER })
	readonly count: number
}

export class BuyManyDeviceDto extends BuyDeviceDtoController {
	@IsString({ message: TypeValidation.IS_STRING })
	deviceId: string
}

export class BuyDeviceDto extends BuyDeviceDtoController {
	@IsString({ message: TypeValidation.IS_STRING })
	deviceId: string

	@IsString({ message: TypeValidation.IS_STRING })
	userId: string
}
