import { Module, forwardRef } from '@nestjs/common'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { DeviceModule } from 'src/device/device.module'
import { TokenModule } from 'src/token/token.module'

@Module({
	controllers: [CartController],
	providers: [CartService],
	imports: [PrismaModule, forwardRef(() => DeviceModule), TokenModule],
	exports: [CartService]
})
export class CartModule {}
