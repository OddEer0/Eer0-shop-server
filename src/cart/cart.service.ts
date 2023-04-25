import { UNAUTHORIZED } from '@/common/constants/status'
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { DEVICE_NOT_FOUND } from 'src/device/device.const'
import { PrismaService } from 'src/prisma/prisma.service'
import { TokenService } from 'src/token/token.service'
import { CART_DEVICE_EXISTS, CART_DEVICE_NOT_FOUND, COUNT_GREATEST_DEVICE, COUNT_LESS_DEVICE } from './cart.const'
import { UsersService } from 'src/users/users.service'
import { USER_NOT_FOUND } from 'src/users/user.const'

@Injectable()
export class CartService {
	constructor(
		private prismaService: PrismaService,
		private tokenService: TokenService,
		private usersService: UsersService
	) {}

	async getCartByUserId(userId: string) {
		const cart = await this.prismaService.user.findUnique({
			where: { id: userId },
			select: { cart: { include: { device: true } } }
		})

		return cart.cart
	}

	async getCartDeviceById(id: string) {
		return this.prismaService.cartDevice.findUnique({ where: { id }, include: { device: true } })
	}

	async addDeviceToCart(deviceId: string, userId: string) {
		const cartDevice = await this.prismaService.cartDevice.findFirst({ where: { deviceId, userId } })
		if (cartDevice) {
			throw new BadRequestException(CART_DEVICE_EXISTS)
		}
		const user = await this.usersService.getUserById(userId)
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND)
		}
		const device = await this.prismaService.device.findUnique({ where: { id: deviceId } })
		if (!device) {
			throw new NotFoundException(DEVICE_NOT_FOUND)
		}

		await this.prismaService.cartDevice.create({ data: { userId, deviceId, count: 1 } })

		return this.getCartByUserId(userId)
	}

	async removeDeviceFromCart(id: string) {
		const cartDevice = await this.getCartDeviceById(id)

		if (!cartDevice) {
			throw new NotFoundException(CART_DEVICE_NOT_FOUND)
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
			throw new NotFoundException(CART_DEVICE_NOT_FOUND)
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
