import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterAuthDto } from "./dtos/register--user-dto";
import { LoginAuthDto } from "./dtos/login-user-dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() payload: RegisterAuthDto) {
        return await this.authService.register(payload)
    }

    @Post('login')
    async login(@Body() payload: LoginAuthDto) {
        return await this.authService.login(payload)
    }
}