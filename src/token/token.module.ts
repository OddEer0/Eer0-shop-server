import { PrismaModule } from './../prisma/prisma.module'
import { Module } from '@nestjs/common'
import { TokenService } from './token.service'

@Module({
	providers: [TokenService],
	imports: [PrismaModule],
	exports: [TokenService]
})
export class TokenModule {}
