import { GetUser } from '@/common/decorators/user.decorator'
import { JwtAuthGuard } from '@/common/guards/jwtAuthGuard.guard'
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { BookingDeviceService } from './booking-device.service'

@Controller('booking-device')
export class BookingDeviceController {
	constructor(private bookingDeviceService: BookingDeviceService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	getBookingDevice(@GetUser() user: User) {
		return this.bookingDeviceService.getByUserId(user.id)
	}

	@UseGuards(JwtAuthGuard)
	@Post('approve/:id')
	approveBookingDevice(@Param('id') id: string, @GetUser() user: User) {
		return this.bookingDeviceService.approve(id, user.id)
	}

	@UseGuards(JwtAuthGuard)
	@Post('approve/many/all')
	approveAllBookingsDevices(@GetUser() user: User) {
		return this.bookingDeviceService.approveAll(user.id)
	}
}
