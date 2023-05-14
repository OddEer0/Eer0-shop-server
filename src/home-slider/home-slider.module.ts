import { Module } from '@nestjs/common'
import { HomeSliderController } from './home-slider.controller'
import { HomeSliderService } from './home-slider.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { FilesModule } from 'src/files/files.module'

@Module({
	controllers: [HomeSliderController],
	providers: [HomeSliderService],
	imports: [PrismaModule, FilesModule]
})
export class HomeSliderModule {}
