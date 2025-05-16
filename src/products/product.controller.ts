import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { ProductService } from "./product.service";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { CreateProductDto } from "./dtos/create-product.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { FileSizeValidationPipe } from "src/pipes/check-file-size.pipe";
import { FileTypeValidationPipe } from "src/pipes/check-file-mimetype";
import { AuthGuard } from "src/guards/check-auth-guard";
import { RolesGuard } from "src/guards/check-roles-guard";
import { Protected } from "src/decorators/protected.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { UserRoles } from "src/enums/user-roles-enum";

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Protected(true)
    @Roles([UserRoles.ADMIN, UserRoles.SUPER_ADMIN])
    @Get()
    async getAll() {
        return await this.productService.getAll()
    }

    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Protected(true)
    @Roles([UserRoles.ADMIN, UserRoles.SUPER_ADMIN])
    @UsePipes()
    @UseInterceptors(FileInterceptor('image_url'))
    @ApiConsumes('multipart/form-data')
    @Post()
    async create(@Body() payload: CreateProductDto, @UploadedFile(new FileSizeValidationPipe, new FileTypeValidationPipe) file: Express.Multer.File) {
        
        return await this.productService.create(payload, file)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Protected(true)
    @Roles([UserRoles.ADMIN, UserRoles.SUPER_ADMIN])
    @UseInterceptors(FileInterceptor('image_url'))
    @ApiConsumes('multipart/form-data')
    @Put(':id')
    async update(@Body() payload: UpdateProductDto, @Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) {
        return await this.productService.update(payload, id, file)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Protected(true)
    @Roles([UserRoles.ADMIN, UserRoles.SUPER_ADMIN])
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.productService.delete(id)
    }
}