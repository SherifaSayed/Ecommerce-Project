import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { TOKEN_TYPES } from "src/Common";
import { Roles } from "src/Common/Decorators";
import { TokenService } from "src/Common/Services";

@Injectable()
export default class RolesGuard implements CanActivate {
    constructor(private reflactor:Reflector) { }
     canActivate(context: ExecutionContext): boolean {
        const allowedRoles= this.reflactor.get('roles', context.getHandler())
        let request = context.switchToHttp().getRequest(); 
        if (context['contextType'] == 'graphql')
             request = GqlExecutionContext.create(context).getContext()
       const userRole= request.user?.role; 
       if(!allowedRoles || !allowedRoles.includes(userRole))
        throw new UnauthorizedException('unauthorizes')

        return true;
    }
}