import { IBaseQuery } from '../types/Query.types'

export class TransformBaseQueryDto {
	base: IBaseQuery
	other: any

	constructor(queryObj: any, defaultValue?: IBaseQuery) {
		const { page, limit, order, sortBy, ...other } = queryObj
		this.base = {} as IBaseQuery

		this.base.page = page ? +page : 1
		this.base.limit = limit ? +limit : 30
		this.base.sortBy = sortBy ? sortBy : defaultValue.sortBy
		this.base.order = order ? order : defaultValue.order ? defaultValue.order : 'asc'

		this.other = other
	}
}
