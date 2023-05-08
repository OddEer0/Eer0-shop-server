import { GetUser } from '@/common/decorators/user.decorator'
import { JwtAuthGuard } from '@/common/guards/jwtAuthGuard.guard'
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { PurchaseDeviceService } from './purchase-device.service'

@Controller('purchase-device')
export class PurchaseDeviceController {
	constructor(private purchaseDeviceService: PurchaseDeviceService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	getPurchaseDeviceByUserId(@GetUser() user: User) {
		return this.purchaseDeviceService.getByUserId(user.id)
	}

	@Post('refound/:id')
	@UseGuards(JwtAuthGuard)
	refoundDevice(@GetUser() user: User, @Param('id') id: string) {
		return this.purchaseDeviceService.refound(id, user.id)
	}
}
