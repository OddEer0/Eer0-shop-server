import { Module, forwardRef } from '@nestjs/common'
import { BookingDeviceModule } from 'src/booking-device/booking-device.module'
import { BrandModule } from 'src/brand/brand.module'
import { CategoryModule } from 'src/category/category.module'
import { InfoModule } from 'src/info/info.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersModule } from 'src/users/users.module'
import { DeviceController } from './device.controller'
import { DeviceService } from './device.service'

@Module({
	controllers: [DeviceController],
	providers: [DeviceService],
	imports: [PrismaModule, BrandModule, CategoryModule, InfoModule, UsersModule, BookingDeviceModule],
	exports: [DeviceService]
})
export class DeviceModule {}
