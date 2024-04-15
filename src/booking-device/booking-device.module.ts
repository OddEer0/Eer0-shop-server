import { Module, forwardRef } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersModule } from 'src/users/users.module'
import { BookingDeviceController } from './booking-device.controller'
import { BookingDeviceService } from './booking-device.service'
import { PurchaseDeviceModule } from 'src/purchase-device/purchase-device.module'

@Module({
	controllers: [BookingDeviceController],
	providers: [BookingDeviceService],
	imports: [PrismaModule, UsersModule],
	exports: [BookingDeviceService]
})
export class BookingDeviceModule {}
