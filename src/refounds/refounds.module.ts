import { Module } from '@nestjs/common'
import { RefoundsController } from './refounds.controller'
import { RefoundsService } from './refounds.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
	controllers: [RefoundsController],
	providers: [RefoundsService],
	imports: [PrismaModule],
	exports: [RefoundsService]
})
export class RefoundsModule {}
