import { PrismaModule } from './../prisma/prisma.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TokenController } from './token.controller'
import { TokenService } from './token.service'

@Module({
	controllers: [TokenController],
	providers: [TokenService],
	imports: [PrismaModule, JwtModule.register({})],
	exports: [TokenService]
})
export class TokenModule {}
