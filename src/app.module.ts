import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TokenModule } from './token/token.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { PrismaModule } from './prisma/prisma.module'
import { BrandModule } from './brand/brand.module'
import { DeviceModule } from './device/device.module'
import { CartModule } from './cart/cart.module'
import { CommentModule } from './comment/comment.module'
import { CategoryModule } from './category/category.module'
import { FilterModule } from './filter/filter.module'
import { InfoModule } from './info/info.module'
import { FilesModule } from './files/files.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { GlobalJwtModule } from './common/modules/globalJwt.module'
import { PurchaseDeviceModule } from './purchase-device/purchase-device.module';
import { BookingDeviceModule } from './booking-device/booking-device.module';
import { RefoundsModule } from './refounds/refounds.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV}` }),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static')
		}),
		GlobalJwtModule,
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
		InfoModule,
		FilesModule,
		PurchaseDeviceModule,
		BookingDeviceModule,
		RefoundsModule
	]
})
export class AppModule {}
