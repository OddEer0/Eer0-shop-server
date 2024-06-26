import { RoleEnum } from '@/common/types/Roles'
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common'
import { AddDeviceToCartDto } from './dto/addDeviceToCart.dto'
import { RolesOrAuthor } from '@/common/decorators/rolesOrAuthor.decorator'
import { CartService } from './cart.service'
import { RemoveDeviceFromCartDto } from './dto/removeDeviceFromCart.dto'
import { Request } from 'express'
import { SetCountCartDevice } from './dto/setCountCartDevice.dto'
import { CART_NOT_FOUND } from './cart.const'
import { JwtAuthGuard } from '@/common/guards/jwtAuthGuard.guard'
import { GetUser } from '@/common/decorators/user.decorator'
import { User } from '@prisma/client'

@Controller('cart')
export class CartController {
	constructor(private cartService: CartService) {}

	@RolesOrAuthor(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator)
	@Post('device/:id')
	addDeviceToCart(@Body() dto: AddDeviceToCartDto, @Param('id') id: string) {
		return this.cartService.addDeviceToCart(dto.deviceId, id)
	}

	@RolesOrAuthor(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator)
	@Delete('device/:id')
	removeDeviceFromCart(@Param('id') id: string) {
		return this.cartService.removeDeviceFromCart(id)
	}

	@RolesOrAuthor(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator)
	@Get(':id')
	async getOneCart(@Param('id') id: string) {
		const cart = await this.cartService.getCartByUserId(id)
		if (!cart) {
			throw new NotFoundException(CART_NOT_FOUND)
		}

		return cart
	}

	@Get('/token/access')
	@UseGuards(JwtAuthGuard)
	getCart(@GetUser() user: User) {
		const cart = this.cartService.getCartByUserId(user.id)
		if (!cart) {
			throw new NotFoundException(CART_NOT_FOUND)
		}

		return cart
	}

	@Get('/token/access/:access')
	getCartByToken(@Param('access') token: string) {
		return this.cartService.getCartByAccessToken(token)
	}

	@RolesOrAuthor(RoleEnum.developer, RoleEnum.admin)
	@Post('device/count/:id')
	setCountDevice(@Body() dto: SetCountCartDevice, @Param('id') id: string) {
		return this.cartService.setCartDeviceCount(id, dto.count)
	}
}
