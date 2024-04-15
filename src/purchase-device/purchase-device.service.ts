import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { USER_NOT_FOUND } from 'src/users/user.const'
import { UsersService } from 'src/users/users.service'
import { CreatePurchaseDeviceDto } from './dto/createPurchaseDevice.dto'
import { DeviceService } from 'src/device/device.service'
import { NOT_ACCESS, PURCHASE_DEVICE_NOT_FOUND } from './purchase-device.const'
import { RefoundsService } from 'src/refounds/refounds.service'

@Injectable()
export class PurchaseDeviceService {
	constructor(
		private prismaService: PrismaService,
		private userService: UsersService,
		private deviceService: DeviceService,
		private refoundService: RefoundsService
	) {}

	async getByUserId(id: string) {
		const user = await this.userService.getUserById(id)
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND)
		}

		return await this.prismaService.purchaseDevice.findMany({
			where: { userId: id },
			select: { id: true, device: true, count: true, deviceId: true, userId: true }
		})
	}

	async create(dto: CreatePurchaseDeviceDto) {
		await this.userService.getOne(dto.userId)
		await this.deviceService.getOne(dto.deviceId)

		return await this.prismaService.purchaseDevice.create({ data: dto })
	}

	async refound(id: string, userId: string) {
		const device = await this.getOne(id)
		if (userId !== device.userId) {
			throw new ForbiddenException(NOT_ACCESS)
		}

		const refound = await this.refoundService.create({
			count: device.count,
			deviceId: device.deviceId,
			userId: device.userId
		})
		await this.prismaService.device.update({
			where: { id: device.deviceId },
			data: { count: { increment: device.count } }
		})
		await this.delete(id)

		return refound
	}

	async getOne(id: string) {
		const device = await this.prismaService.purchaseDevice.findUnique({ where: { id } })
		if (!device) {
			throw new NotFoundException(PURCHASE_DEVICE_NOT_FOUND)
		}
		return device
	}

	async delete(id: string) {
		const candidate = this.getOne(id)
		if (!candidate) {
			throw new NotFoundException(PURCHASE_DEVICE_NOT_FOUND)
		}
		await this.prismaService.purchaseDevice.delete({ where: { id } })
	}
}
