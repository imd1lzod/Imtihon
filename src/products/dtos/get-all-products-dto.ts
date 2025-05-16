import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsNumberString, IsOptional, IsString } from "class-validator";
import { SortField, SortOrder } from "../../enums/get-all-products.enum";
import { ProductStatus } from "src/enums/product-status-enum";

export class GetAllUsersDto {
    @ApiProperty({ type: 'number', example: 5, required: false, default: 5 })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    limit?: number

    @ApiProperty({ type: 'number', example: 1, required: false, default: 1 })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    page?: number

    @ApiProperty({ type: 'string', enum: SortField, required: false })
    @IsOptional()
    @IsEnum(SortField)
    sortField?: SortField

    @ApiProperty({ type: 'string', enum: SortOrder, required: false })
    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder?: SortOrder

    @ApiProperty({ type: 'number', example: 18, required: false })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    minPrice?: number

    @ApiProperty({ type: 'number', example: 100, required: false })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    maxPrice?: number

    @ApiProperty({ type: 'string', enum: ProductStatus, required: false })
    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    fields?: string
}