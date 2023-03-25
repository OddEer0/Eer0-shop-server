import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TokenModule } from './token/token.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { PrismaModule } from './prisma/prisma.module'
import { BrandModule } from './brand/brand.module';
import { DeviceModule } from './device/device.module';
import { CartModule } from './cart/cart.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { FilterModule } from './filter/filter.module';
import { InfoModule } from './info/info.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV}` }),
		UsersModule,
		TokenModule,
		RolesModule,
		AuthModule,
		PrismaModule,
		BrandModule,
		DeviceModule,
		CartModule,
		CommentModule,
		CategoryModule,
		FilterModule,
		InfoModule
	]
})
export class AppModule {}
