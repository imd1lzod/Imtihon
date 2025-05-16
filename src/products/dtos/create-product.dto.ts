import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'Telefon', description: "Mahsulot nomi" })
    @IsString()
    name: string

    @ApiProperty({ example: 'Yangi mahsulot', description: 'Mahsulot tavsifi'})
    @IsString()
    description: string

    @ApiProperty({ example: 400, description: 'Mahsulot narxi' })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    price: number 

    @ApiProperty({ example: 15, description: 'Chegirma' })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    discount: number

    @ApiProperty({ example: 5, description: 'Mahsulot reytingi' })
    @Transform(({ value }) => Number(value)) 
    @IsNumber()
    rating: number

    @ApiProperty({ example: 100, description: 'Mahsulot soni' })
    @Transform(({ value }) => Number(value)) 
    @IsNumber()
    stock: number

    @ApiProperty({ example: 'active', description: 'Mahsulot holati', })
    @IsString() 
    status: string

    @ApiProperty({ type: 'string', format: 'binary', required: false})
    image_url?: Express.Multer.File

}