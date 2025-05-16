import { Column, DataType, Model, Table } from "sequelize-typescript"
import { UserRoles } from "src/enums/user-roles-enum"

@Table({ tableName: 'users' })
export class UserModel extends Model {
    @Column({ type: DataType.STRING })
    name: string

    @Column({ type: DataType.STRING })
    email: string

    @Column({ type: DataType.STRING })
    password: string

    @Column({ type: DataType.ENUM, values: Object.values(UserRoles), defaultValue: UserRoles.USER })
    role?: string
}