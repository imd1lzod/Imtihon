import { ArgumentMetadata, ConflictException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const size = 1 * 1024 * 1024
            if (value.size > size) {
                throw new ConflictException('Fayl hajmi 1mb dan kichik bo`lishi kerak')
            }
        
        return value
    }
}