import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { TransformDeviceQueryDto } from '../dto/transformDeviceQuery.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { TransformBaseQueryDto } from '@/common/dtos/transformBaseQuery.dto'
import { TransformIncludeQueryDto } from '@/common/dtos/transformIncludeQuery.dto'
import { DEVICE_INCLUDE_KEYS } from '@/common/constants/includeKeys'

@Injectable()
export class TransformDeviceQueryPipe implements PipeTransform {
	constructor(private prismaService: PrismaService) {}

	async transform(value: any) {
		const baseQuery = new TransformBaseQueryDto(value, {
			maxLimit: 100,
			minLimit: 10,
			sortBy: 'createdAt',
			order: 'desc',
			sortByValidFields: ['createdAt', 'price']
		})

		const where = new TransformDeviceQueryDto(value)
		const newOther = {}
		const result = {} as Prisma.DeviceFindManyArgs

		if (!where.base.categoryId) {
			throw new BadRequestException()
		}

		const infos = await this.prismaService.filter.findMany({ where: { categoryId: where.base.categoryId } })

		infos.forEach(info => {
			newOther[info.name] = where.other[info.name]
		})

		result.where = {
			...where.base,
			AND: this.queriesToAndArray(newOther),
			OR: this.brandQueryToOrArray(where.other.brand)
		}

		result.take = baseQuery.base.limit
		result.skip = (baseQuery.base.page - 1) * baseQuery.base.limit

		result.orderBy = {
			[baseQuery.base.sortBy]: baseQuery.base.order
		}

		result.include = new TransformIncludeQueryDto<Prisma.DeviceInclude>(
			where.other.include,
			DEVICE_INCLUDE_KEYS
		).include

		return result
	}

	private queryToOrInfoArray(name: string, value: string) {
		const arr = []
		value.split(',').forEach(val => {
			arr.push({ name, value: val })
		})
		return arr
	}

	private brandQueryToOrArray(value: string) {
		if (!value) return
		const arr = []
		value.split(',').forEach(val => {
			arr.push({ brand: { name: val } })
		})

		if (arr.length) {
			return arr
		}
		return
	}

	private queriesToAndArray(query: any) {
		const entries = Object.entries<string>(query)
		const andArray = []

		entries.forEach(entry => {
			if (!entry[1]) return
			const orArray = this.queryToOrInfoArray(...entry)
			andArray.push({ infos: { some: { OR: orArray } } })
		})

		return andArray
	}
}
