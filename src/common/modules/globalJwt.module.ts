import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

@Global()
@Module({
	imports: [JwtModule],
	exports: [JwtModule]
})
export class GlobalJwtModule {}
