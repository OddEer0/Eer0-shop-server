import { UNAUTHORIZED } from '@/common/constants/status'
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CART_DEVICE_IS_HAVE, CART_DEVICE_IS_NOT_HAVE, DEVICE_OR_CART_NOT_FOUND } from 'src/device/device.const'
import { DeviceService } from 'src/device/device.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { TokenService } from 'src/token/token.service'
import { CART_NOT_FOUND } from './cart.const'
import { error } from 'console'

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
		const cart = await this.prismaService.cart.findUnique({
			where: { userId },
			include: { devices: { include: { device: withDevice } } }
		})

		return cart
	}

	async getCartDeviceById(id: string) {
		return this.prismaService.cartDevice.findUnique({ where: { id }, include: { cart: true } })
	}

	async getCartDeviceByDeviceAndUserId(deviceId: string, userId: string) {
		return this.prismaService.cartDevice.findFirst({ where: { deviceId, cartId: userId } })
	}

	async addDeviceToCart(deviceId: string, cartId: string) {
		const device = await this.getCartDeviceByDeviceAndUserId(deviceId, cartId)
		const cart = await this.getCartByUserId(cartId)

		if (device) {
			throw new BadRequestException(CART_DEVICE_IS_HAVE)
		}

		if (!cart) {
			throw new NotFoundException(CART_NOT_FOUND)
		}

		await this.prismaService.cartDevice.create({ data: { cartId, deviceId, count: 1 } })

		return this.getCartByUserId(cartId)
	}

	async removeDeviceFromCart(id: string) {
		const cartDevice = await this.getCartDeviceById(id)

		if (!cartDevice) {
			throw new BadRequestException(CART_DEVICE_IS_NOT_HAVE)
		}

		await this.prismaService.cartDevice.delete({
			where: { id: id }
		})

		return await this.getCartByUserId(cartDevice.cart.userId)
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

	async setCartDeviceCount(id: string, count: number) {
		const cartDevice = await this.prismaService.cartDevice.findFirst({ where: { id }, include: { cart: true } })

		if (!cartDevice) {
			throw new NotFoundException(DEVICE_OR_CART_NOT_FOUND)
		}

		await this.prismaService.cartDevice.update({ where: { id }, data: { count } })

		return await this.getCartByUserId(cartDevice.cart.userId)
	}
}
