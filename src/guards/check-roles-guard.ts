import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRoles } from "../enums/user-roles-enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const roles = this.reflector.getAllAndOverride<UserRoles[]>('isrole', [context.getClass(), context.getHandler()])

        const ctx = context.switchToHttp()
        const request = ctx.getRequest<
            Request & { role?: UserRoles; id?: string }
        >()

        let userRole = request.role;


        if (!userRole || !roles || !roles.includes(userRole)) {
            throw new ForbiddenException('Siz bu amalni bajara olmaysiz');
        }

        return true
    }
}