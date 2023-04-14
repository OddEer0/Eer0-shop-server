import { IQueryOrderType } from '@/common/types/IBaseQuery'

export interface IBaseQuery {
	page?: number
	limit?: number
	sortBy: string
	order?: IQueryOrderType
}

export class TransformBaseQueryDto {
	base: IBaseQuery
	other: any

	constructor(queryObj: any, defaultValue?: IBaseQuery) {
		const { page, limit, order, sortBy, ...other } = queryObj
		this.base = {} as IBaseQuery

		this.base.page = page ? +page : 1
		this.base.limit = limit ? +limit : 30
		this.base.sortBy = sortBy ? sortBy : defaultValue.sortBy
		this.base.order = order ? defaultValue?.order : 'asc'

		this.other = other
	}
}
