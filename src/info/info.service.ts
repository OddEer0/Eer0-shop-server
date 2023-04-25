import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateInfoDto } from './dto/createInfo.dto'
import { INFO_EXISTS, INFO_NOT_FOUND } from './info.const'
import { ITransformBaseQueryPipe } from '@/common/pipes/transformBaseQuery.pipe'

@Injectable()
export class InfoService {
	constructor(private prismaService: PrismaService) {}

	async create(dto: CreateInfoDto) {
		const candidate = await this.prismaService.info.findFirst({ where: { filterId: dto.filterId, value: dto.value } })
		if (candidate) {
			throw new BadRequestException(INFO_EXISTS)
		}

		return await this.prismaService.info.create({ data: dto })
	}

	async getAll() {
		return await this.prismaService.info.findMany()
	}

	async getOne(id: string) {
		const info = await this.prismaService.info.findUnique({ where: { id } })
		if (!info) {
			throw new NotFoundException(INFO_NOT_FOUND)
		}

		return info
	}

	async getOrCreate(dto: CreateInfoDto) {
		const info = await this.prismaService.info.findFirst({ where: { filterId: dto.filterId, value: dto.value } })
		if (info) {
			return info
		}

		return await this.prismaService.info.create({ data: dto })
	}

	async getByDeviceId(id: string, { base: { limit, page }, other }: ITransformBaseQueryPipe) {
		if (other.all) {
			return await this.prismaService.info.findMany({
				where: { devices: { some: { id } } }
			})
		}

		return await this.prismaService.info.findMany({
			where: { devices: { some: { id } } },
			take: limit,
			skip: limit * (page - 1)
		})
	}
}
