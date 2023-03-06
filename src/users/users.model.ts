import { UUIDV4 } from 'sequelize'
import { BelongsToMany, Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/userRoles.model'
import { Token } from 'src/token/token.model'

interface UserCreationAttribute {
	email: string
	login: string
	password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttribute> {
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
	email: string

	@Column({
		type: DataType.TEXT,
		unique: true,
		allowNull: false
	})
	nickname: string

	@Column({
		type: DataType.TEXT,
		allowNull: true
	})
	avatar: string

	@Column({
		type: DataType.TEXT,
		allowNull: false
	})
	password: string

	@Column({
		type: DataType.TEXT,
		allowNull: false,
		defaultValue: 'Nameless'
	})
	firstName: string

	@Column({
		type: DataType.TEXT,
		allowNull: false,
		defaultValue: ''
	})
	lastName: string

	@Column({
		type: DataType.DATE,
		allowNull: true
	})
	birthday: Date

	@Column({
		type: DataType.TEXT
	})
	activationLink: string

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	isActivate: boolean

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	isBanned: boolean

	@Column({
		type: DataType.TEXT,
		allowNull: true
	})
	banReason: string

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]

	@HasOne(() => Token)
	token: Token
}
