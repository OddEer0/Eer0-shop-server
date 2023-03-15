import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TokenModule } from './token/token.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { PrismaModule } from './prisma/prisma.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: `.${process.env.NODE_ENV}.env` }),
		UsersModule,
		TokenModule,
		RolesModule,
		AuthModule,
		PrismaModule
	]
})
export class AppModule {}
