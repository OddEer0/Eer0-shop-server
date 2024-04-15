import { Module } from '@nestjs/common'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { TokenModule } from 'src/token/token.module'
import { UsersModule } from 'src/users/users.module'

@Module({
	controllers: [CartController],
	providers: [CartService],
	imports: [PrismaModule, TokenModule, UsersModule],
	exports: [CartService]
})
export class CartModule {}
