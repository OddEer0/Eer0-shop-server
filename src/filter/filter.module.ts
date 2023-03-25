import { Module } from '@nestjs/common'
import { FilterService } from './filter.service'
import { FilterController } from './filter.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
	providers: [FilterService],
	controllers: [FilterController],
	imports: [PrismaModule]
})
export class FilterModule {}
