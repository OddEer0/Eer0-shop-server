import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { FilesModule } from 'src/files/files.module'

@Module({
	controllers: [CategoryController],
	providers: [CategoryService],
	imports: [PrismaModule, FilesModule],
	exports: [CategoryService]
})
export class CategoryModule {}
