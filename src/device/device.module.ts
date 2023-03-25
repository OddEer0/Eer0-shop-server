import { Module } from '@nestjs/common'
import { BrandModule } from 'src/brand/brand.module'
import { CategoryModule } from 'src/category/category.module'
import { InfoModule } from 'src/info/info.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { DeviceController } from './device.controller'
import { DeviceService } from './device.service'

@Module({
	controllers: [DeviceController],
	providers: [DeviceService],
	imports: [PrismaModule, BrandModule, CategoryModule, InfoModule],
	exports: [DeviceService]
})
export class DeviceModule {}
