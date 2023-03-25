import { CreateInfoDto } from 'src/info/dto/createInfo.dto'

interface InfoInterface {
	name: string
	value: string
	filterId: string
}

export class CreateDeviceDto {
	readonly name: string
	readonly description: string
	readonly price: number
	readonly stock: null | number
	readonly stockPercent: null | number
	readonly count: number
	readonly images: string[]
	readonly categoryId: string
	readonly brandId: string
	readonly infos: CreateInfoDto[]
}
