import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/createUser.dto'
import { AuthService } from './auth.service'
import { AuthLoginDto } from './dto/authLogin.dto'
import { Response } from 'express'
import { Request } from 'express'
import { ITokens } from '@/common/types/ITokens'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/registration')
	async registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
		try {
			const userData = await this.authService.registration(userDto)
			this.setTokens(res, userData.tokens)
			return userData.user
		} catch (error) {
			console.log(error)
		}
	}

	@Post('/login')
	async login(@Body() dto: AuthLoginDto, @Res({ passthrough: true }) res: Response) {
		try {
			const userData = await this.authService.login(dto)
			this.setTokens(res, userData.tokens)
			return userData.user
		} catch (error) {
			console.log(error)
		}
	}

	@Get('/refresh')
	async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const { refreshToken } = req.cookies
		const userData = await this.authService.refresh(refreshToken)
		this.setTokens(res, userData.tokens)
		return userData.user
	}

	setTokens(res: Response, tokens: ITokens) {
		res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
		res.cookie('accessToken', tokens.accessToken, { maxAge: 7 * 24 * 60 * 60 * 1000 })
	}
}
