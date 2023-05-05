import { GetUser } from '@/common/decorators/user.decorator'
import { JwtAuthGuard } from '@/common/guards/jwtAuthGuard.guard'
import { Controller, Get, UseGuards } from '@nestjs/common'
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
}
