import { ConflictException, Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "./model/user.model";
import { RegisterAuthDto } from "./dtos/register--user-dto";
import * as bcrypt from "bcryptjs"
import { LoginAuthDto } from "./dtos/login-user-dto";
import { UserRoles } from "src/enums/user-roles-enum";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(@InjectModel(UserModel) private userModel: typeof UserModel, private jwtService: JwtService) { }
    async onModuleInit() {
        await this.seedAdmin()
    }

    async register(payload: RegisterAuthDto) {
        const user = await this.userModel.findOne({ where: { email: payload.email } })
        if (user) {
            throw new ConflictException('Foydalanuvchi allaqachon mavjud')
        }

        const hashedPassword = bcrypt.hashSync(payload.password)

        const data = await this.userModel.create({ name: payload.name, email: payload.email, password: hashedPassword })

        return {
            message: 'Foydalanuvchi muvaffaqiyatli ro`yxatdan o`tdi',
            data: data
        }
    }

    async login(payload: LoginAuthDto) {

        const foundedUser = await this.userModel.findOne({ where: { email: payload.email } })
        // console.log(foundedUser?.dataValues.role);
        // console.log(foundedUser?.dataValues.id);




        if (!foundedUser) {
            throw new NotFoundException('Foydalanuvchi topilmadi')
        }

        const isUserMatch = bcrypt.compareSync(payload.password, foundedUser.dataValues.password)


        if (!isUserMatch) {
            throw new ConflictException('Parol xato')
        }
        // console.log(process.env.TOKEN_SECRET_EXPIRE);


        const accessToken = this.jwtService.sign({ id: foundedUser.dataValues.id, role: foundedUser.dataValues.role }, {
            secret: process.env.TOKEN_SECRET,
            expiresIn: process.env.TOKEN_SECRET_EXPIRE
        })
        // console.log(accessToken);


        return {
            message: 'Foydalanuvchi muvaffaqiyatli tizimga kirdi',
            data: foundedUser,
            accessToken: accessToken
        }
    }

    async seedAdmin() {
        const data = [
            {
                name: 'Ali',
                email: 'ali@gmail.com',
                password: '5555',
                role: UserRoles.ADMIN
            }
        ]

        for (let u of data) {
            const user = await this.userModel.findOne({ where: { email: u.email } })
            if (user) continue
            const hashedPassword = bcrypt.hashSync(u.password)
            await this.userModel.create({ name: u.name, email: u.email, password: hashedPassword, role: u.role })
        }
        console.log(`Default adminlar yaratildi`);

    }
}