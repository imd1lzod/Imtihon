import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateProductDto {
    @ApiProperty({ example: 'Telefon', description: "Mahsulot nomi" })
    @IsString()
    name?: string

    @ApiProperty({ example: 'Yangi mahsulot', description: 'Mahsulot tavsifi' })
    @IsString()
    description?: string

    @ApiProperty({ example: 400, description: 'Mahsulot narxi' })
    @IsString()
    price?: number

    @ApiProperty({ example: 15, description: 'Chegirma' })
    @IsString()
    discount?: number

    @ApiProperty({ example: 5, description: 'Mahsulot reytingi' })
    @IsString()
    rating?: number

    @ApiProperty({ example: 100, description: 'Mahsulot soni' })
    @IsString()
    stock?: number

    @ApiProperty({ example: 'active', description: 'Mahsulot holati', })
    @IsString()
    status?: string

    @ApiProperty({ type: 'string', format: 'binary' })
    image_url?: Express.Multer.File
}