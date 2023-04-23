import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthLoginDto } from './dto/authLogin.dto'
import { Response } from 'express'
import { Request } from 'express'
import { ITokens } from '@/common/types/ITokens'
import { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } from './auth.const'
import { AuthRegistrationDto } from './dto/authRegistration.dto'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/registration')
	async registration(@Body() userDto: AuthRegistrationDto, @Res({ passthrough: true }) res: Response) {
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
		res.cookie('refreshToken', tokens.refreshToken, { maxAge: REFRESH_TOKEN_TIME, httpOnly: true })
		res.cookie('accessToken', tokens.accessToken, { maxAge: ACCESS_TOKEN_TIME, httpOnly: true })
	}

	deleteTokens(res: Response) {
		res.clearCookie('refreshToken')
		res.clearCookie('accessToken')
	}

	@Post('logout')
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const { refreshToken } = req.cookies
		await this.authService.logout(refreshToken)
		this.deleteTokens(res)
	}
}
