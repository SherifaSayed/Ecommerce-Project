import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { TOKEN_TYPES } from "src/Common";
import { TokenService } from "src/Common/Services";

@Injectable()
export default class RolesGuard implements CanActivate {
    constructor(private allowedRoles:string[]) { }
     canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
       const userRole= request.user?.role;
       
        return this.allowedRoles.includes(userRole);
    }
}