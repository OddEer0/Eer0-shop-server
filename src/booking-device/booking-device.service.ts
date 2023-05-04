import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from 'src/users/users.service'
import { BOOKING_DEVICE_EXISTS } from './booking.const'
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
}
