import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersModule } from 'src/users/users.module'
import { PurchaseDeviceController } from './purchase-device.controller'
import { PurchaseDeviceService } from './purchase-device.service'

@Module({
	controllers: [PurchaseDeviceController],
	providers: [PurchaseDeviceService],
	imports: [UsersModule, PrismaModule]
})
export class PurchaseDeviceModule {}
