import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

const start = async () => {
	const app = await NestFactory.create(AppModule)
	const PORT = process.env.SERVER_PORT || 5000

	const config = new DocumentBuilder()
		.setTitle('Eer0-Shop Documentation')
		.setDescription('Documentation REST API')
		.setVersion('1.0.0')
		.addTag('Eer0')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/api/docs', app, document)

	app.use(cookieParser())
	app.enableCors()

	await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()
