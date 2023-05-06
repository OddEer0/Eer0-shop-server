import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersModule } from 'src/users/users.module'
import { PurchaseDeviceController } from './purchase-device.controller'
import { PurchaseDeviceService } from './purchase-device.service'
import { DeviceModule } from 'src/device/device.module'
import { RefoundsModule } from 'src/refounds/refounds.module'

@Module({
	controllers: [PurchaseDeviceController],
	providers: [PurchaseDeviceService],
	imports: [UsersModule, PrismaModule, DeviceModule, RefoundsModule],
	exports: [PurchaseDeviceService]
})
export class PurchaseDeviceModule {}
