export type IQueryOrderType = 'asc' | 'desc'

export interface IBaseQuery {
	page: number
	limit: number
	sortBy: string
	order: IQueryOrderType
}
