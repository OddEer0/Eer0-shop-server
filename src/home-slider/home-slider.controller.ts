import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common'
import { HomeSliderService } from './home-slider.service'
import { CreateHomeSliderDto } from './dto/CreateHomeSlider.dto'
import { UpdateHomeSliderDto } from './dto/UpdateHomeSlider.dto'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('home-slider')
export class HomeSliderController {
	constructor(private homeSliderService: HomeSliderService) {}

	@Roles(RoleEnum.developer, RoleEnum.admin)
	@UseInterceptors(FileInterceptor('image'))
	@Post()
	createHomeSlider(@Body() dto: CreateHomeSliderDto, @UploadedFile() image: Express.Multer.File) {
		return this.homeSliderService.create(dto, image)
	}

	@Get()
	getAllHomeSlider() {
		return this.homeSliderService.getAll()
	}

	@Roles(RoleEnum.developer, RoleEnum.admin)
	@Delete(':id')
	deleteHomeSlider(@Param('id') id: string) {
		return this.homeSliderService.delete(id)
	}

	@Roles(RoleEnum.developer, RoleEnum.admin)
	@Put(':id')
	updateHomeSlider(@Param('id') id: string, @Body() dto: UpdateHomeSliderDto) {
		return this.homeSliderService.update(id, dto)
	}

	@Roles(RoleEnum.developer, RoleEnum.admin)
	@UseInterceptors(FileInterceptor('image'))
	@Put('image/:id')
	updateHomeSliderImage(@UploadedFile() image: Express.Multer.File, @Param('id') id: string) {
		return this.homeSliderService.updateImage(id, image)
	}
}
