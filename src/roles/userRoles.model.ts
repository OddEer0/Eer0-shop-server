import { UUIDV4 } from 'sequelize'
import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { Role } from './roles.model'

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
	@Column({
		type: DataType.STRING,
		unique: true,
		defaultValue: UUIDV4,
		primaryKey: true
	})
	id: string

	@ForeignKey(() => Role)
	@Column({ type: DataType.STRING })
	roleId: string

	@ForeignKey(() => User)
	@Column({ type: DataType.STRING })
	userId: string
}
