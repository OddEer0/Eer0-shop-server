import { Body, Controller, Get, Post } from '@nestjs/common'
import { BrandService } from './brand.service'
import { CreateBrandDto } from './dto/createBrand.dto'

@Controller('brand')
export class BrandController {
	constructor(private brandService: BrandService) {}

	@Get()
	async getAllBrand() {
		return this.brandService.getAllBrand()
	}

	@Post()
	async createBrand(@Body() brandDto: CreateBrandDto) {
		return this.brandService.createBrand(brandDto)
	}
}
