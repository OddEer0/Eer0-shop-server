import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModule } from './token/token.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { Role } from './roles/roles.model'
import { User } from './users/users.model'
import { Token } from './token/token.model'
import { UserRoles } from './roles/userRoles.model'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: `.${process.env.NODE_ENV}.env` }),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.PG_HOST,
			port: +process.env.PG_PORT,
			username: process.env.PG_USER,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DB,
			models: [Role, User, Token, UserRoles],
			autoLoadModels: true
		}),
		UsersModule,
		TokenModule,
		RolesModule,
		AuthModule
	]
})
export class AppModule {}
