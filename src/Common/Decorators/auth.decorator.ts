import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
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
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);