import { RoleEnum } from '@/common/types/Roles'
import { Body, Controller, Get, NotFoundException, Param, Post, Req } from '@nestjs/common'
import { AddDeviceToCartDto } from './dto/addDeviceToCart.dto'
import { RolesOrAuthor } from '@/common/decorators/rolesOrAuthor.decorator'
import { CartService } from './cart.service'
import { CART_NOT_FOUND } from './cart.const'
import { RemoveDeviceFromCartDto } from './dto/removeDeviceFromCart.dto'
import { Request } from 'express'

@Controller('cart')
export class CartController {
	constructor(private cartService: CartService) {}

	@RolesOrAuthor(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator)
	@Post('device')
	addDeviceToCart(@Body() dto: AddDeviceToCartDto) {
		return this.cartService.addDeviceToCart(dto.deviceId, dto.userId)
	}

	@RolesOrAuthor(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator)
	@Post('device/remove')
	removeDeviceFromCart(@Body() dto: RemoveDeviceFromCartDto) {
		return this.cartService.removeDeviceFromCart(dto.deviceId, dto.userId)
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
}
