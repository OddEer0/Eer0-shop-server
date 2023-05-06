import { GetUser } from '@/common/decorators/user.decorator'
import { JwtAuthGuard } from '@/common/guards/jwtAuthGuard.guard'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { RefoundsService } from './refounds.service'

@Controller('refounds')
export class RefoundsController {
	constructor(private refoundService: RefoundsService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	getRefoundDevice(@GetUser() user: User) {
		return this.refoundService.getByUserId(user.id)
	}
}
