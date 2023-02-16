import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

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
			models: [],
			autoLoadModels: true
		})
	]
})
export class AppModule {}
