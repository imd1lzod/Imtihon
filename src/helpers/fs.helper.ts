import * as path from "path";
import * as fs from "fs"

export class FsHelper {
    async uploadFile(file: Express.Multer.File) {
        
        
        const filePath = path.join(process.cwd(), 'uploads')
        if(!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath,{recursive: true})
        }
        
        const fileName = `${Date.now()}-${Math.floor(900000 * Math.random() + 1000)}${file.originalname}`
        const fullPAth = path.join(filePath, fileName)
        
        fs.writeFileSync(fullPAth, file.buffer)

        return {
            message: 'Faylga muvaffaqiyatli yozildi',
            data: fileName
        }
    }

    async removeFile(file: string) {
        console.log(file);
        
        
        
            const filePath = path.join(process.cwd(), "uploads", file)

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
    
        return {
            message: 'Fayl muvaffaqiyatli o`chirildi'
        }
    }
}
}