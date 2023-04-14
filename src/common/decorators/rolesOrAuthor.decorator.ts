import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { ROLES_KEY } from './rolesAuth.decorator'
import { RolesOrAuthorGuard } from '../guards/rolesOrAuthor.guard'

export const RolesOrAuthor = (...roles: string[]) => {
	return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RolesOrAuthorGuard))
}
