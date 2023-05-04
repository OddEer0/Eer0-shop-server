import { GetUser } from '@/common/decorators/user.decorator'
import { JwtAuthGuard } from '@/common/guards/jwtAuthGuard.guard'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { PurchaseDeviceService } from './purchase-device.service'

@Controller('purchase-device')
export class PurchaseDeviceController {
	constructor(private purchaseDeviceService: PurchaseDeviceService) {}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	getPurchaseDeviceByUserId(@GetUser() user: User) {
		return this.purchaseDeviceService.getByUserId(user.id)
	}
}
