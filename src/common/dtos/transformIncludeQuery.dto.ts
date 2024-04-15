import { BadRequestException } from '@nestjs/common'

export class TransformIncludeQueryDto<T = unknown> {
	include: T

	constructor(include: string | undefined, includeValues: Array<keyof T>) {
		if (Array.isArray(include)) {
			throw new BadRequestException()
		}
		if (!include) {
			this.include = undefined
		} else {
			const result = {} as T
			let mutateCount = 0

			include.split(',').forEach(val => {
				if (includeValues.includes(val as keyof T)) {
					mutateCount++
					result[val] = true
				}
			})

			this.include = mutateCount ? result : undefined
		}
	}
}
