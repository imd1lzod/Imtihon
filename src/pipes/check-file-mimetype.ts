import { ArgumentMetadata, ConflictException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // console.log(value);
        const mimeTypes = ['jpg', 'png', 'gif', "jpeg"]
        const mType = value.mimetype.split('/')[1]
        // console.log(mType);


        if (!mimeTypes.includes(mType)) {
            throw new ConflictException('Fayl formati xato berilgan')
        }

        return value
    }
}