export class CreateFilterDto {
	readonly name: string
	readonly type: string
	readonly title: string
	readonly maxValue: null | number
	readonly minValue: null | number
	readonly categoryId: string
}
