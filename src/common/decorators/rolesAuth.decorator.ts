import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { RolesGuard } from '../guards/roles.guard'
import { RoleEnum } from '../types/Roles'

export const ROLES_KEY = 'roles'

export const Roles = (...roles: string[]) => {
	return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RolesGuard))
}
