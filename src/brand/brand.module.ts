import { Module } from '@nestjs/common'
import { BrandService } from './brand.service'
import { BrandController } from './brand.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
	providers: [BrandService],
	controllers: [BrandController],
	imports: [PrismaModule],
	exports: [BrandService]
})
export class BrandModule {}
