import { TypeValidation } from '@/common/constants/validation'
import { IsNumber } from 'class-validator'

export class SetCountCartDevice {
	@IsNumber({}, { message: TypeValidation.IS_NUMBER })
	readonly count: number
}
