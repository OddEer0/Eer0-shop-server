import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/createUser.dto'
import { AuthService } from './auth.service'
import { AuthLoginDto } from './dto/authLogin.dto'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/registration')
	registration(@Body() userDto: CreateUserDto) {
		return this.authService.registration(userDto)
	}

	@Post('/login')
	login(@Body() dto: AuthLoginDto) {
		return this.authService.login(dto)
	}
}
