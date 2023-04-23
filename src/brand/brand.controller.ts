import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { BrandService } from './brand.service'
import { CreateBrandDto } from './dto/createBrand.dto'

@Controller('brand')
export class BrandController {
	constructor(private brandService: BrandService) {}

	@Get()
	async getAllBrand() {
		return this.brandService.getAll()
	}

	@Get(':id')
	async getBrandById(@Param('id') id: string) {
		return this.brandService.getOne(id)
	}

	@Post()
	async createBrand(@Body() brandDto: CreateBrandDto) {
		return this.brandService.create(brandDto)
	}

	@Get('/category/:id')
	async getBrandByCategoryId(@Param('id') id: string) {
		return this.brandService.getBrandsByCategoryId(id)
	}
}
