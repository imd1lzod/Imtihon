import { Model } from "sequelize-typescript"
import { Column, Table, DataType } from "sequelize-typescript"
import { ProductStatus } from "src/enums/product-status-enum"

@Table({ tableName: "products" })
export class ProductModel extends Model {
    @Column({ type: DataType.STRING })
    name: string

    @Column({ type: DataType.TEXT })
    description: string

    @Column({ type: DataType.INTEGER })
    price: number

    @Column({ type: DataType.INTEGER })
    discount: number

    @Column({ type: DataType.INTEGER })
    rating: number

    @Column({ type: DataType.INTEGER })
    stock: number

    @Column({ type: DataType.ENUM, values: Object.values(ProductStatus), defaultValue: ProductStatus.active})
    status: string

    @Column({ type: DataType.TEXT })
    image_url?: string
}
