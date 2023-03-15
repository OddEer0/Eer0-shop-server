import { PrismaModule } from './../prisma/prisma.module'
import { Module } from '@nestjs/common'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'

@Module({
	controllers: [RolesController],
	providers: [RolesService],
	imports: [PrismaModule],
	exports: [RolesService]
})
export class RolesModule {}
