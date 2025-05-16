import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'Telefon', description: "Mahsulot nomi" })
    @IsString()
    name: string

    @ApiProperty({ example: 'Yangi mahsulot', description: 'Mahsulot tavsifi'})
    @IsString()
    description: string

    @ApiProperty({ example: 400, description: 'Mahsulot narxi' })
    @Transform(({ value }) => Number(value))
    price: number 

    @ApiProperty({ example: 15, description: 'Chegirma' })
    @Transform(({ value }) => Number(value))
    discount: number

    @ApiProperty({ example: 5, description: 'Mahsulot reytingi' })
    @Transform(({ value }) => Number(value)) 
    rating: number

    @ApiProperty({ example: 100, description: 'Mahsulot soni' })
    @Transform(({ value }) => Number(value)) 
    stock: number

    @ApiProperty({ example: 'active', description: 'Mahsulot holati', })
    @IsString() 
    status: string

    @ApiProperty({ type: 'string', format: 'binary'})
    image_url?: Express.Multer.File

}