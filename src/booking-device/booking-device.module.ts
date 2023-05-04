import { forwardRef, Module } from '@nestjs/common'
import { DeviceModule } from 'src/device/device.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersModule } from 'src/users/users.module'
import { BookingDeviceController } from './booking-device.controller'
import { BookingDeviceService } from './booking-device.service'

@Module({
	controllers: [BookingDeviceController],
	providers: [BookingDeviceService],
	imports: [PrismaModule, UsersModule],
	exports: [BookingDeviceService]
})
export class BookingDeviceModule {}
