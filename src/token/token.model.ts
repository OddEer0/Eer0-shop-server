import { UUIDV4 } from 'sequelize'
import { Table, Model, Column, DataType, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from 'src/users/users.model'

interface TokenCreationAttribute {
	userId: string
	refreshToken: string
}

@Table({ tableName: 'tokens' })
export class Token extends Model<Token, TokenCreationAttribute> {
	@Column({
		type: DataType.STRING,
		unique: true,
		defaultValue: UUIDV4,
		primaryKey: true
	})
	id: string

	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: true
	})
	refreshToken: string

	@ForeignKey(() => User)
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	userId: string

	@BelongsTo(() => User)
	user: User
}
