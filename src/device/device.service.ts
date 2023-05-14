import { Injectable, NotFoundException } from '@nestjs/common'
import { BrandService } from 'src/brand/brand.service'
import { CategoryService } from 'src/category/category.service'
import { InfoService } from 'src/info/info.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateDeviceDto } from './dto/createDevice.dto'
import { Prisma } from '@prisma/client'
import { DEVICE_EXISTS, DEVICE_NOT_FOUND } from './device.const'
import { CATEGORY_NOT_FOUND } from 'src/category/category.const'
import { BuyDeviceDto, BuyManyDeviceDto } from './dto/buyDevice.dto'
import { UsersService } from 'src/users/users.service'
import { BookingDeviceService } from 'src/booking-device/booking-device.service'
import { FilesService } from 'src/files/files.service'

@Injectable()
export class DeviceService {
	constructor(
		private prismaService: PrismaService,
		private brandService: BrandService,
		private categoryService: CategoryService,
		private infoService: InfoService,
		private userService: UsersService,
		private bookingDeviceService: BookingDeviceService,
		private fileService: FilesService
	) {}

	async create(dto: CreateDeviceDto, images: Express.Multer.File[]) {
		const candidate = await this.prismaService.device.findUnique({ where: { name: dto.name } })

		if (candidate) {
			throw new NotFoundException(DEVICE_EXISTS)
		}

		const brand = await this.brandService.getOne(dto.brandId)
		const category = await this.categoryService.getCategoryById(dto.categoryId)

		if (!category) {
			throw new NotFoundException(CATEGORY_NOT_FOUND)
		}

		await this.categoryService.addBrandToCategory(category.id, brand.id)

		const filesName = await this.fileService.createManyFile(images)

		const connect = []

		for await (const info of dto.infos) {
			const infoData = await this.infoService.getOrCreate(info)
			connect.push({ id: infoData.id })
		}

		const device = await this.prismaService.device.create({
			data: {
				...dto,
				images: filesName,
				infos: {
					connect: connect
				}
			}
		})

		return device
	}

	async getSortAndFiltered(args: Prisma.DeviceFindManyArgs) {
		const deviceCount = await this.prismaService.device.count({ where: { ...args.where } })
		const devices = await this.prismaService.device.findMany({ ...args })

		return {
			devices,
			pageCount: Math.ceil(deviceCount / args.take)
		}
	}

	async getAll(args: Prisma.DeviceFindManyArgs) {
		return await this.prismaService.device.findMany(args)
	}

	async deleteOne(id: string) {
		await this.prismaService.cartDevice.deleteMany({ where: { deviceId: id } })
		await this.prismaService.refound.deleteMany({ where: { deviceId: id } })
		await this.prismaService.bookingsDevice.deleteMany({ where: { deviceId: id } })
		await this.prismaService.purchaseDevice.deleteMany({ where: { deviceId: id } })
		await this.prismaService.comment.deleteMany({ where: { deviceId: id } })
		await this.prismaService.device.delete({ where: { id } })
		return 'Девайс с ' + id + 'удалён'
	}

	async buy(dto: BuyDeviceDto) {
		await this.userService.getOne(dto.userId)
		await this.getOne(dto.deviceId)
		await this.prismaService.device.update({ where: { id: dto.deviceId }, data: { count: { decrement: dto.count } } })

		return await this.bookingDeviceService.create(dto)
	}

	async buyMany(dto: BuyManyDeviceDto[], userId: string) {
		const newDto = dto.map(data => ({ ...data, userId }))

		for await (const data of newDto) {
			await this.prismaService.device.update({
				where: { id: data.deviceId },
				data: { count: { decrement: data.count } }
			})
		}

		return await this.bookingDeviceService.createMany(newDto)
	}

	async getOne(id: string, include?: Prisma.DeviceInclude) {
		const device = await this.prismaService.device.findUnique({ where: { id }, include })

		if (!device) {
			throw new NotFoundException(DEVICE_NOT_FOUND)
		}

		return device
	}

	async getDeviceById(id: string) {
		return await this.prismaService.device.findUnique({ where: { id } })
	}

	async update(dto) {}
}
