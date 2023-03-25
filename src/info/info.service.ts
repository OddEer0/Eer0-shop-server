import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateInfoDto } from './dto/createInfo.dto'

@Injectable()
export class InfoService {
	constructor(private prismaService: PrismaService) {}

	async createInfo(dto: CreateInfoDto) {
		const info = await this.prismaService.info.create({ data: dto })
		return info
	}

	async getInfoById(id: string) {
		const info = await this.prismaService.info.findUnique({ where: { id } })
		return info
	}

	async getInfoByFilterIdAndValue(id: string, value: string) {
		const info = await this.prismaService.info.findFirst({ where: { filterId: id, value: value } })

		return info
	}

	async getAllInfo() {
		const infos = await this.prismaService.info.findMany()
		return infos
	}
}
