import { UNAUTHORIZED } from '@/common/constants/status'
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { DEVICE_OR_CART_NOT_FOUND } from 'src/device/device.const'
import { DeviceService } from 'src/device/device.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { TokenService } from 'src/token/token.service'

@Injectable()
export class CartService {
	constructor(
		private prismaService: PrismaService,
		private deviceService: DeviceService,
		private tokenService: TokenService
	) {}

	async createCart(userId) {
		const cart = await this.prismaService.cart.create({ data: { userId } })

		return cart
	}

	async getCartByUserId(userId, withDevice?: boolean) {
		const cart = await this.prismaService.cart.findUnique({ where: { userId }, include: { devices: withDevice } })

		return cart
	}

	async addDeviceToCart(deviceId: string, userId: string) {
		const device = await this.deviceService.getDeviceById(deviceId, true, true)
		const cart = await this.getCartByUserId(userId)

		if (!device && !cart) {
			throw new NotFoundException(DEVICE_OR_CART_NOT_FOUND)
		}

		return await this.prismaService.cart.update({
			where: { userId },
			data: { devices: { connect: { id: deviceId } } },
			include: { devices: true }
		})
	}

	async removeDeviceFromCart(deviceId: string, userId: string) {
		const device = await this.deviceService.getDeviceById(deviceId, true, true)
		const cart = await this.getCartByUserId(userId)

		if (!device && !cart) {
			throw new NotFoundException(DEVICE_OR_CART_NOT_FOUND)
		}

		return await this.prismaService.cart.update({
			where: { userId },
			data: { devices: { disconnect: { id: deviceId } } },
			include: { devices: true }
		})
	}

	async getCartByAccessToken(accessToken) {
		if (!accessToken) {
			throw new UnauthorizedException(UNAUTHORIZED)
		}

		const userData = await this.tokenService.validateAccessToken(accessToken)

		if (!userData) {
			throw new UnauthorizedException(UNAUTHORIZED)
		}

		const cart = await this.getCartByUserId(userData.id, true)

		return cart
	}
}
