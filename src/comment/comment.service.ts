import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCommentDto } from './dto/createComment.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from 'src/users/users.service'
import { DeviceService } from 'src/device/device.service'
import { USER_NOT_FOUND } from 'src/users/user.const'
import { COMMENT_NOT_FOUND } from './comment.const'
import { UpdateCommentDto } from './dto/updateComment.dto'
import { IBaseQuery } from '@/common/types/Query.types'

@Injectable()
export class CommentService {
	constructor(
		private prismaService: PrismaService,
		private usersService: UsersService,
		private deviceService: DeviceService
	) {}

	async create(dto: CreateCommentDto) {
		const user = await this.usersService.getUserById(dto.userId)

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND)
		}

		const device = await this.deviceService.getDeviceById(dto.deviceId)
		if (!device) {
			throw new NotFoundException(USER_NOT_FOUND)
		}

		return this.prismaService.comment.create({ data: { ...dto } })
	}

	async update(id: string, dto: UpdateCommentDto) {
		const comment = await this.prismaService.comment.findUnique({ where: { id } })

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND)
		}

		return this.prismaService.comment.update({ where: { id }, data: dto })
	}

	async like(id: string) {
		const comment = await this.prismaService.comment.findUnique({ where: { id } })

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND)
		}

		return this.prismaService.comment.update({ where: { id }, data: { like: comment.like + 1 } })
	}

	async dislike(id: string) {
		const comment = await this.prismaService.comment.findUnique({ where: { id } })

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND)
		}

		return this.prismaService.comment.update({ where: { id }, data: { dislike: comment.dislike + 1 } })
	}

	async getByDeviceId(id: string, query: IBaseQuery) {
		return await this.prismaService.comment.findMany({
			take: query.limit,
			skip: query.limit * (query.page - 1),
			orderBy: {
				[query.sortBy]: query.order
			},
			where: { deviceId: id },
			include: { user: { select: { avatar: true, firstName: true, lastName: true } } }
		})
	}

	async getOne(id: string) {
		const comment = this.prismaService.comment.findUnique({ where: { id } })

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND)
		}

		return comment
	}
}
