import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/users/users.model'
import { TokenController } from './token.controller'
import { Token } from './token.model'
import { TokenService } from './token.service'

@Module({
	controllers: [TokenController],
	providers: [TokenService],
	imports: [JwtModule.register({}), SequelizeModule.forFeature([Token, User])],
	exports: [TokenService]
})
export class TokenModule {}
