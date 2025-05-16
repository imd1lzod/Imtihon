import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "./model/user.model";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        SequelizeModule.forFeature([UserModel], {logging: false})
    ],
    providers: [AuthService, JwtService],
    controllers: [AuthController]
})
export class AuthModule { }