import { UUIDV4 } from 'sequelize'
import { Table, Model, Column, DataType, BelongsToMany } from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { UserRoles } from './userRoles.model'

interface RoleCreationAttribute {
	value: string
	description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttribute> {
	@Column({
		type: DataType.STRING(500),
		unique: true,
		defaultValue: UUIDV4,
		primaryKey: true
	})
	id: string

	@Column({
		type: DataType.TEXT,
		unique: true,
		allowNull: false
	})
	value: string

	@Column({
		type: DataType.TEXT,
		allowNull: false
	})
	description: string

	@BelongsToMany(() => User, () => UserRoles)
	users: User[]
}
