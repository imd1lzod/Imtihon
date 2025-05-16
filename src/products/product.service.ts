import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProductModel } from "./model/product.model";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { CreateProductDto } from "./dtos/create-product.dto";
import { FsHelper } from "src/helpers/fs.helper";

@Injectable()
export class ProductService implements OnModuleInit{
    constructor(@InjectModel(ProductModel) private productModel: typeof ProductModel, private fsHelper: FsHelper) { }

    async onModuleInit() {
        await this.seedProducts()
    }

    async create(payload: CreateProductDto, file: Express.Multer.File) {

        const image = await this.fsHelper.uploadFile(file)


        const result = await this.productModel.create({
            name: payload.name, description: payload.description, price: payload.price,
            discount: payload.discount, rating: payload.rating, stock: payload.stock, status: payload.status, image_url: image.data
        }, { returning: true })

        return {
            message: 'Mahsulot muvaffaqiyatli yaratildi',
            data: result
        }
    }

    async getAll() {
        const result = await this.productModel.findAll()

        if (!result) {
            throw new NotFoundException('Mahsulotlar topilmadi')
        }

        return {
            message: 'Mahsulotlar muvaffaqiyatli olindi',
            data: result
        }
    }

    async update(payload: UpdateProductDto, id: number, file: Express.Multer.File) {
        const product = await this.productModel.findByPk(id)

        if (!product) {
            throw new NotFoundException('Mahsulot topilmadi')
        }
        await this.fsHelper.removeFile(product.dataValues.image_url)

        const image = await this.fsHelper.uploadFile(file)

        const updatedProduct = await this.productModel.update({
            name: payload.name, description: payload.description, price: payload.price,
            discount: payload.discount, rating: payload.rating, stock: payload.stock, status: payload.status, image_url: image['data']
        }, { where: { id }, returning: true })

        return {
            message: "Mahsulotlar muvaffaqiyatli yangilandi",
            data: updatedProduct
        }
    }

    async delete(id: number) {
        const product = await this.productModel.findByPk(id)

        if (!product) {
            throw new NotFoundException('Mahsulot topilmadi')
        }

        await this.fsHelper.removeFile(product.dataValues.image_url)

        await product.destroy()

        return {
            message: "Mahsulotlar muvaffaqiyatli tozalandi",
        }
    }

    async seedProducts() {
        const data = 
            [{ "name": "Vegetable - Base", description: "Kids", "price": 64, discount: 31, rating: 2, stock: 549, status: "inactive" },
                { name: "Lemonade - Strawberry, 591 Ml", description: "Toys", "price": 65, discount: 38, rating: 3, stock: 569, status: "active" },
                { name: "Tart Shells - Sweet, 4", description: "Automotive", "price": 97, discount: 46, rating: 1, stock: 8, status: "inactive" },
                { name: "Truffle - Whole Black Peeled", description: "Jewelry", "price": 82, discount: 29, rating: 1, stock: 537, status: "active" },
                { name: "Crab - Dungeness, Whole", description: "Outdoors", "price": 56, discount: 42, rating: 1, stock: 20, status: "out_of_stock" },
                { name: "Pastry - Key Limepoppy Seed Tea", description: "Clothing", "price": 64, discount: 8, rating: 1, stock: 446, status: "active" },
                { name: "Cheese - Brick With Onion", description: "Home", "price": 84, discount: 40, rating: 1, stock: 606, status: "out_of_stock" },
                { name: "Bread - Pita, Mini", description: "Automotive", "price": 100, discount: 21, rating: 1, stock: 1000, status: "out_of_stock" },
                { name: "Crab - Blue, Frozen", description: "Kids", "price": 87, discount: 39, rating: 1, stock: 865, status: "active" },
                { name: "Muffin Hinge Container 6", description: "Clothing", "price": 89, discount: 5, rating: 1, stock: 498, status: "out_of_stock" },
                { name: "Cake - Mini Potato Pancake", description: "Clothing", "price": 88, discount: 16, rating: 5, stock: 497, status: "out_of_stock" },
                { name: "Duck - Breast", description: "Jewelry", "price": 87, discount: 17, rating: 4, stock: 460, status: "inactive" },
                { name: "Persimmons", description: "Clothing", "price": 96, discount: 34, rating: 3, stock: 438, status: "active" },
                { name: "Ecolab - Orange Frc, Cleaner", description: "Clothing", "price": 66, discount: 14, rating: 1, stock: 146, status: "active" },
                { name: "Soup - Knorr, French Onion", description: "Home", "price": 59, discount: 48, rating: 3, stock: 801, status: "inactive" },
                { name: "Spice - Chili Powder Mexican", description: "Tools", "price": 100, discount: 34, rating: 4, stock: 908, status: "active" },
                { name: "Island Oasis - Cappucino Mix", description: "Music", "price": 99, discount: 39, rating: 4, stock: 58, status: "inactive" },
                { name: "Syrup - Monin - Blue Curacao", description: "Beauty", "price": 70, discount: 15, rating: 5, stock: 600, status: "inactive" },
                { name: "Artichoke - Hearts, Canned", description: "Shoes", "price": 89, discount: 34, rating: 1, stock: 8, status: "inactive" },
                { name: "Broom - Push", description: "Baby", "price": 92, discount: 19, rating: 5, stock: 249, status: "active" }]

        for (let u of data) {
            const product = await this.productModel.findOne({ where: { name: u.name } })
            if (product) continue

            await this.productModel.create({ name: u.name, description: u.description, price: u.price, discount: u.discount, rating: u.rating, stock: u.stock, status: u.status })
        }
        console.log(`Default productlar yaratildi`);

    }
}