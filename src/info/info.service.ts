import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateInfoDto } from './dto/createInfo.dto'
import { INFO_IS_HAVE, INFO_NOT_FOUND } from './info.const'

@Injectable()
export class InfoService {
	constructor(private prismaService: PrismaService) {}

	async create(dto: CreateInfoDto) {
		const candidate = await this.prismaService.info.findFirst({ where: { filterId: dto.filterId, value: dto.value } })
		if (candidate) {
			throw new BadRequestException(INFO_IS_HAVE)
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
}
