import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { UsersModule } from 'src/users/users.module'
import { DeviceModule } from 'src/device/device.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy'

@Module({
	providers: [CommentService, JwtStrategy],
	controllers: [CommentController],
	imports: [UsersModule, DeviceModule, PrismaModule]
})
export class CommentModule {}
