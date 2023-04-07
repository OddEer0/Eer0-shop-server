import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as uuid from 'uuid'
import * as path from 'path'
import * as fs from 'fs'
import * as sharp from 'sharp'

@Injectable()
export class FilesService {
	async createFile(file: Express.Multer.File, width?: number, height?: number): Promise<string> {
		try {
			const fileName = uuid.v4() + '.webp'
			const filePath = path.resolve(__dirname, '..', 'static')
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true })
			}
			let fileWebp = await this.convertImageToWebP(file.buffer)
			if (width && height) {
				fileWebp = await this.resizeImage(fileWebp, width, height)
			}

			fs.writeFileSync(path.join(filePath, fileName), fileWebp)
			return `${process.env.SERVER_URL}/${fileName}`
		} catch (error) {
			throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async deleteFile(fileName: string) {
		try {
			const filePath = path.resolve(__dirname, '..', 'static')
			fs.unlinkSync(path.join(filePath, fileName))
		} catch (error) {
			throw new HttpException('Произошла ошибка при удалений файла', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async convertImageToWebP(imgBuffer: Buffer) {
		try {
			return await sharp(imgBuffer).webp().toBuffer()
		} catch (error) {
			throw new HttpException(
				'Произошла ошибка при конвертирований картинки в WebP формат',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async resizeImage(imgBuffer: Buffer, width: number, height: number) {
		try {
			return await sharp(imgBuffer).resize({ width, height }).toBuffer()
		} catch (error) {
			throw new HttpException('Произошла ошибка при resize картинки', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
