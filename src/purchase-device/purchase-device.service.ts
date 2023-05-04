import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { USER_NOT_FOUND } from 'src/users/user.const'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class PurchaseDeviceService {
	constructor(private prismaService: PrismaService, private userService: UsersService) {}

	async getByUserId(id: string) {
		const user = await this.userService.getUserById(id)
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND)
		}

		return await this.prismaService.purchaseDevice.findMany({ where: { userId: id } })
	}
}
