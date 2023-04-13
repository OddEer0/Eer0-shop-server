import { PrismaModule } from './../prisma/prisma.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TokenService } from './token.service'

@Module({
	providers: [TokenService],
	imports: [PrismaModule, JwtModule.register({})],
	exports: [TokenService]
})
export class TokenModule {}
