import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard, RolesGuard } from "src/Guards";


// export const Roles = Reflector.createDecorator<string[]>()
export const Roles = (...roles: string[]) => SetMetadata('roles', roles)
export const Auth = (...roles: string[]) => {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AuthGuard, RolesGuard)
  )
}


export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    let request = ctx.switchToHttp().getRequest();
     if (ctx['contextType'] == 'graphql')
                 request = GqlExecutionContext.create(ctx).getContext()
    return request.user;
  },
);