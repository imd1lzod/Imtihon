import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { FsHelper } from "src/helpers/fs.helper";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductModel } from "./model/product.model";
import { AuthGuard } from "src/guards/check-auth-guard";
import { RolesGuard } from "src/guards/check-roles-guard";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.TOKEN_SECRET,
            signOptions: {
                expiresIn: process.env.TOKEN_SECRET_EXPIRE
            }
        }),
        SequelizeModule.forFeature([ProductModel], {logging: false})
    ],
    exports: [JwtModule],
    controllers: [ProductController],
    providers: [ProductService, FsHelper, AuthGuard, RolesGuard, JwtService]
})

export class ProductModule {}