import { RoleEnum } from '@/common/types/Roles'
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Req } from '@nestjs/common'
import { AddDeviceToCartDto } from './dto/addDeviceToCart.dto'
import { RolesOrAuthor } from '@/common/decorators/rolesOrAuthor.decorator'
import { CartService } from './cart.service'
import { CART_NOT_FOUND } from './cart.const'
import { RemoveDeviceFromCartDto } from './dto/removeDeviceFromCart.dto'
import { Request } from 'express'
import { SetCountCartDevice } from './dto/setCountCartDevice.dto'

@Controller('cart')
export class CartController {
	constructor(private cartService: CartService) {}

	@RolesOrAuthor(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator)
	@Post('device')
	addDeviceToCart(@Body() dto: AddDeviceToCartDto) {
		return this.cartService.addDeviceToCart(dto.deviceId, dto.userId)
	}

	@RolesOrAuthor(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator)
	@Delete('device/:id')
	removeDeviceFromCart(@Param('id') id: string) {
		return this.cartService.removeDeviceFromCart(id)
	}

	@RolesOrAuthor(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator)
	@Get(':id')
	async getOneCart(@Param('id') id: string) {
		const cart = await this.cartService.getCartByUserId(id, true)

		if (!cart) {
			throw new NotFoundException(CART_NOT_FOUND)
		}

		return cart
	}

	@Get('/token/access')
	getCartByToken(@Req() req: Request) {
		const { accessToken } = req.cookies

		return this.cartService.getCartByAccessToken(accessToken)
	}

	@RolesOrAuthor(RoleEnum.developer, RoleEnum.admin)
	@Post('device/count/:id')
	setCountDevice(@Body() dto: SetCountCartDevice, @Param('id') id: string) {
		return this.cartService.setCartDeviceCount(id, dto.count)
	}
}
