import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { InfoService } from './info.service'
import { InfoController } from './info.controller'

@Module({
	providers: [InfoService],
	imports: [PrismaModule],
	controllers: [InfoController],
	exports: [InfoService]
})
export class InfoModule {}
