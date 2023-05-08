import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateRefoundDto } from './dto/CreateRefound.dto'

@Injectable()
export class RefoundsService {
	constructor(private prismaService: PrismaService) {}

	async create(dto: CreateRefoundDto) {
		return await this.prismaService.refound.create({ data: dto })
	}

	async getByUserId(userId: string) {
		return await this.prismaService.refound.findMany({
			where: { userId },
			select: { device: true, count: true, deviceId: true, userId: true, id: true }
		})
	}
}
