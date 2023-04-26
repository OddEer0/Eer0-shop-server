import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Global()
@Module({
	imports: [JwtModule.register({ secret: process.env.ACCESS_SECRET_KEY }), PassportModule],
	exports: [JwtModule]
})
export class GlobalJwtModule {}
