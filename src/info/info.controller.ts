import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateInfoDto } from './dto/createInfo.dto'
import { InfoService } from './info.service'

@Controller('info')
export class InfoController {
	constructor(private infoService: InfoService) {}

	@Post()
	createInfo(@Body() infoDto: CreateInfoDto) {
		return this.infoService.createInfo(infoDto)
	}

	@Get()
	getAllInfo() {
		return this.infoService.getAllInfo()
	}
}
