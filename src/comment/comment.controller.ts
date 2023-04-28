import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common'
import { CreateCommentControllerDto } from './dto/createComment.dto'
import { CommentService } from './comment.service'
import { JwtAuthGuard } from '@/common/guards/jwtAuthGuard.guard'
import { UpdateCommentDto } from './dto/updateComment.dto'
import { Roles } from '@/common/decorators/rolesAuth.decorator'
import { RoleEnum } from '@/common/types/Roles'
import { IBaseQuery } from '@/common/types/Query.types'
import { TransformCommentByDeviceId } from './pipes/TransformCommentByDeviceId.pipe'
import { User } from '@prisma/client'
import { GetUser } from '@/common/decorators/user.decorator'

@Controller('comment')
export class CommentController {
	constructor(private commentService: CommentService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	createComment(@Body() dto: CreateCommentControllerDto, @GetUser() user: User) {
		return this.commentService.create({ ...dto, userId: user.id })
	}

	@Get(':deviceId')
	getCommentByDeviceId(@Param('deviceId') id: string, @Query(TransformCommentByDeviceId) query: IBaseQuery) {
		return this.commentService.getByDeviceId(id, query)
	}

	@Put(':id')
	@Roles(RoleEnum.admin, RoleEnum.developer, RoleEnum.moderator)
	updateComment(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
		return this.commentService.update(id, dto)
	}

	@Post('/like/:id')
	@UseGuards(JwtAuthGuard)
	likeComment(@Param('id') id: string) {
		return this.commentService.like(id)
	}

	@Post('/dislike/:id')
	@UseGuards(JwtAuthGuard)
	dislikeComment(@Param('id') id: string) {
		return this.commentService.dislike(id)
	}

	@Get('one/:id')
	getOne(@Param('id') id: string) {
		return this.commentService.getOne(id)
	}
}
