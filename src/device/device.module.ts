import { Module, forwardRef } from '@nestjs/common'
import { BrandModule } from 'src/brand/brand.module'
import { CategoryModule } from 'src/category/category.module'
import { InfoModule } from 'src/info/info.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { DeviceController } from './device.controller'
import { DeviceService } from './device.service'
import { CartModule } from 'src/cart/cart.module'

@Module({
	controllers: [DeviceController],
	providers: [DeviceService],
	imports: [PrismaModule, BrandModule, CategoryModule, InfoModule, CartModule],
	exports: [DeviceService]
})
export class DeviceModule {}
