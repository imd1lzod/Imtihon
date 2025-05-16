import { BadRequestException, CanActivate, ConflictException, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JsonWebTokenError, JwtService, TokenExpiredError } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { UserRoles } from "../enums/user-roles-enum";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwt: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isProtected = this.reflector.getAllAndOverride<boolean>(
            'istrue',
            [context.getHandler(), context.getClass()]
        )

        const ctx = context.switchToHttp()
        const request = ctx.getRequest<
            Request & { role?: string; id?: string }
        >()
        // console.log(request);


        if (!isProtected) {
            request.role = UserRoles.USER
            return true
        }

        const token = request.headers['authorization']
        console.log(token);

        if (!token) {
            throw new BadRequestException('Token mavjud emas')
        }

        const accessToken = token.split('Bearer')[1].trim();
        if (!accessToken) {
            throw new BadRequestException('Acces token mavjud emas')
        }

        try {
            const data = this.jwt.verify(accessToken, { secret: process.env.TOKEN_SECRET,  })
            console.log(data);


            request.id = data.id
            request.role = data.role
            return true
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new ForbiddenException('Token muddati otib ketgan');
            }

            if (error instanceof JsonWebTokenError) {
                throw new ConflictException("Token formati notogri berib yuborilgan");
            }

            throw new InternalServerErrorException('Server xatoligi');
        }

    }
}