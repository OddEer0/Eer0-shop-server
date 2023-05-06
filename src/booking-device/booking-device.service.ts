import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from 'src/users/users.service'
import { BOOKING_DEVICE_EXISTS, BOOKING_DEVICE_ROLE } from './booking.const'
import { CreateBookingDeviceDto } from './dto/createBookingDevice.dto'
import { UpdateBookingDeviceDto } from './dto/updateBooking.dto'

@Injectable()
export class BookingDeviceService {
	constructor(private prismaService: PrismaService, private userService: UsersService) {}

	async getByUserId(userId) {
		await this.userService.getOne(userId)
		return this.prismaService.bookingsDevice.findMany({ where: { userId } })
	}

	async create(dto: CreateBookingDeviceDto) {
		return await this.prismaService.bookingsDevice.create({ data: dto })
	}

	async createMany(dto: CreateBookingDeviceDto[]) {
		return await this.prismaService.bookingsDevice.createMany({ data: dto })
	}

	async update(dto: UpdateBookingDeviceDto) {
		const bookingDevice = await this.getById(dto.id)
		if (!bookingDevice) {
			throw new NotFoundException(BOOKING_DEVICE_EXISTS)
		}

		return await this.prismaService.bookingsDevice.update({ where: { id: dto.id }, data: dto })
	}

	async getById(id: string) {
		return await this.prismaService.bookingsDevice.findUnique({ where: { id } })
	}

	async approve(id: string, userId: string) {
		const bookingDevice = await this.getById(id)
		if (!id) {
			throw new NotFoundException(BOOKING_DEVICE_EXISTS)
		}
		if (bookingDevice.userId !== userId) {
			throw new ForbiddenException(BOOKING_DEVICE_ROLE)
		}

		return await this.prismaService.purchaseDevice.create({
			data: {
				count: bookingDevice.count,
				userId,
				deviceId: bookingDevice.deviceId
			}
		})
	}

	async approveAll(userId: string) {
		const allBookingsDevices = await this.prismaService.bookingsDevice.findMany({
			where: { userId },
			select: { count: true, deviceId: true, userId: true }
		})
		const purchase = await this.prismaService.purchaseDevice.createMany({ data: allBookingsDevices })
		await this.prismaService.bookingsDevice.deleteMany({ where: { userId } })
		return purchase
	}

	async delete(id: string) {
		const candidate = await this.getById(id)
		if (candidate) {
			throw new NotFoundException(BOOKING_DEVICE_EXISTS)
		}
		await this.prismaService.bookingsDevice.delete({ where: { id } })
	}
}
