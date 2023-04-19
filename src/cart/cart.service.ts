import { UNAUTHORIZED } from '@/common/constants/status'
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CART_DEVICE_IS_HAVE, CART_DEVICE_IS_NOT_FOUND } from 'src/device/device.const'
import { PrismaService } from 'src/prisma/prisma.service'
import { TokenService } from 'src/token/token.service'
import { COUNT_GREATEST_DEVICE, COUNT_LESS_DEVICE } from './cart.const'

@Injectable()
export class CartService {
	constructor(private prismaService: PrismaService, private tokenService: TokenService) {}

	async getCartByUserId(userId: string) {
		const cart = await this.prismaService.user.findUnique({
			where: { id: userId },
			select: { cart: { include: { device: true } } }
		})

		return cart?.cart
	}

	async getCartDeviceById(id: string) {
		return this.prismaService.cartDevice.findUnique({ where: { id }, include: { device: true } })
	}

	async getCartDeviceByDeviceAndUserId(deviceId: string, userId: string) {
		return this.prismaService.cartDevice.findFirst({ where: { deviceId, userId } })
	}

	async addDeviceToCart(deviceId: string, userId: string) {
		const device = await this.getCartDeviceByDeviceAndUserId(deviceId, userId)

		if (device) {
			throw new BadRequestException(CART_DEVICE_IS_HAVE)
		}

		await this.prismaService.cartDevice.create({ data: { userId, deviceId, count: 1 } })

		return this.getCartByUserId(userId)
	}

	async removeDeviceFromCart(id: string) {
		const cartDevice = await this.getCartDeviceById(id)

		if (!cartDevice) {
			throw new NotFoundException(CART_DEVICE_IS_NOT_FOUND)
		}

		await this.prismaService.cartDevice.delete({
			where: { id }
		})

		return await this.getCartByUserId(cartDevice.userId)
	}

	async getCartByAccessToken(accessToken) {
		if (!accessToken) {
			throw new UnauthorizedException(UNAUTHORIZED)
		}

		const userData = await this.tokenService.validateAccessToken(accessToken)

		if (!userData) {
			throw new UnauthorizedException(UNAUTHORIZED)
		}

		const cart = await this.getCartByUserId(userData.id)

		return cart
	}

	async setCartDeviceCount(id: string, count: number) {
		const cartDevice = await this.getCartDeviceById(id)

		if (!cartDevice) {
			throw new NotFoundException(CART_DEVICE_IS_NOT_FOUND)
		}

		await this.prismaService.cartDevice.update({ where: { id }, data: { count } })

		if (count > cartDevice.device.count) {
			throw new BadRequestException(COUNT_GREATEST_DEVICE)
		}

		if (count < 1) {
			throw new BadRequestException(COUNT_LESS_DEVICE)
		}

		return await this.getCartByUserId(cartDevice.userId)
	}
}
