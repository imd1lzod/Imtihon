import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class RegisterAuthDto {
    @ApiProperty({ example: 'Alex', description: 'Foydalanuvchi ismi'})
    @IsString()
    name: string

    @ApiProperty({ example: 'alex@gmail.com', description: 'Foydalanuvchi emaili' })
    @IsString()
    email: string

    @ApiProperty({ example: '1111', description: 'Foydalanuvchi paroli' })
    @IsString()
    password: string
}