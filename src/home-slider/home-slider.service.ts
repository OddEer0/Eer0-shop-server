import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateHomeSliderDto } from './dto/UpdateHomeSlider.dto'
import { FilesService } from 'src/files/files.service'
import { HOME_SLIDER_NOT_FOUND } from './home-slider.const'

@Injectable()
export class HomeSliderService {
	constructor(private prismaService: PrismaService, private fileService: FilesService) {}

	async create(dto, image: Express.Multer.File) {
		const fileName = await this.fileService.createFile(image)

		return await this.prismaService.homeSlider.create({ data: { ...dto, image: fileName } })
	}

	async delete(id) {
		const candidate = await this.prismaService.homeSlider.findUnique({ where: { id } })
		if (!candidate) {
			throw new NotFoundException(HOME_SLIDER_NOT_FOUND)
		}

		await this.fileService.deleteFile(candidate.image.split('/').at(-1))

		return await this.prismaService.homeSlider.delete({ where: { id } })
	}

	async update(id: string, dto: UpdateHomeSliderDto) {
		const slider = await this.prismaService.homeSlider.findUnique({ where: { id } })
		if (!slider) {
			throw new NotFoundException(HOME_SLIDER_NOT_FOUND)
		}

		return await this.prismaService.homeSlider.update({ where: { id }, data: dto })
	}

	async updateImage(id: string, image: Express.Multer.File) {
		const slider = await this.prismaService.homeSlider.findUnique({ where: { id } })
		if (!slider) {
			throw new NotFoundException(HOME_SLIDER_NOT_FOUND)
		}

		await this.fileService.deleteFile(slider.image.split('/').at(-1))
		const fileName = await this.fileService.createFile(image)

		return await this.prismaService.homeSlider.update({ where: { id }, data: { image: fileName } })
	}

	async getAll() {
		return await this.prismaService.homeSlider.findMany()
	}
}
