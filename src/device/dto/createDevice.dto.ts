import { TypeValidation } from '@/common/constants/validation'
import { IsArray, IsNumber, IsString, ValidateIf } from 'class-validator'
import { CreateInfoDto } from 'src/info/dto/createInfo.dto'

export class CreateDeviceDto {
	@IsString({ message: TypeValidation.IS_STRING })
	readonly name: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly description: string

	@IsNumber({}, { message: TypeValidation.IS_NUMBER })
	readonly price: number

	@IsNumber({}, { message: TypeValidation.IS_NUMBER })
	@ValidateIf((obj, value) => value !== null)
	readonly stock: null | number

	@IsNumber({}, { message: TypeValidation.IS_NUMBER })
	@ValidateIf((obj, value) => value !== null)
	readonly stockPercent: null | number

	@IsNumber({}, { message: TypeValidation.IS_NUMBER })
	readonly count: number

	@IsNumber({}, { message: TypeValidation.IS_NUMBER })
	readonly rate: number

	readonly images: string[]

	@IsString({ message: TypeValidation.IS_STRING })
	readonly categoryId: string

	@IsString({ message: TypeValidation.IS_STRING })
	readonly brandId: string

	@IsArray({ message: TypeValidation.IS_ARRAY })
	readonly infos: CreateInfoDto[]
}
