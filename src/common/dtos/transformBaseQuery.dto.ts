import { BadRequestException } from '@nestjs/common'
import { IBaseQuery, IQueryOrderType } from '../types/Query.types'

export interface ITransformBaseQueryDto extends Partial<IBaseQuery> {
	sortBy: string
	sortByValidFields: string[]
	minLimit: number
	maxLimit: number
}

export class TransformBaseQueryDto {
	base: IBaseQuery
	other: any

	constructor(query: any, defaultValue: ITransformBaseQueryDto) {
		const { page, limit, order, sortBy, ...other } = query
		this.base = {} as IBaseQuery

		this.base.page = +page || defaultValue.page || 1
		this.base.limit = this.validateLimit(defaultValue.minLimit, defaultValue.maxLimit, limit, defaultValue.limit || 50)
		this.base.sortBy = this.validateSortBy(sortBy, defaultValue.sortBy, defaultValue.sortByValidFields)
		this.base.order = this.validateOrder(order, defaultValue.order || 'asc')

		this.other = other
	}

	private validateLimit(min: number, max: number, limit: number, defaultLimit: number) {
		const num = +limit
		if (isNaN(num)) {
			return defaultLimit
		} else {
			if (num > max) {
				return max
			} else if (num < min) {
				return min
			}
		}

		return num
	}

	private validateSortBy(sortBy: string, defaultSort: string, defaultSortBy: string[]) {
		if (!defaultSortBy.some(value => value === defaultSort)) {
			throw new BadRequestException('Такого поля не существует')
		}

		if (sortBy && !defaultSortBy.some(value => value === sortBy)) {
			throw new BadRequestException('Такого поля не существует')
		}

		return sortBy || defaultSort
	}

	private validateOrder(order: string, defaultOrder: IQueryOrderType): IQueryOrderType {
		if (order === 'asc' || order === 'desc') {
			return order
		}
		return defaultOrder
	}
}
