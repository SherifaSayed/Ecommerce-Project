import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TOKEN_TYPES } from "src/Common";
import { Roles } from "src/Common/Decorators";
import { TokenService } from "src/Common/Services";

@Injectable()
export default class RolesGuard implements CanActivate {
    constructor(private reflactor:Reflector) { }
     canActivate(context: ExecutionContext): boolean {
        const allowedRoles= this.reflactor.get('roles', context.getHandler())
        const request = context.switchToHttp().getRequest();
       const userRole= request.user?.role; 
       if(!allowedRoles || !allowedRoles.includes(userRole))
        throw new UnauthorizedException('unauthorizes')

        return true;
    }
}