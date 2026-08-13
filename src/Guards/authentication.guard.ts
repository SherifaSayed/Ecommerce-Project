import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { TOKEN_TYPES, UserDocument } from "src/Common";
import { Auth } from "src/Common/Decorators";
import { TokenService } from "src/Common/Services";

@Injectable()
export default class AuthGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        if (context['contextType'] == 'graphql') {
            const request = GqlExecutionContext.create(context).getContext()
            console.log(request);
            const { accesstoken } = request.req.headers

            if (!accesstoken)
                throw new UnauthorizedException('Please login')

            const { user: userData, decodedData } =
                await this.tokenService.decodeToken({
                    token: accesstoken,
                    tokenType: TOKEN_TYPES.ACCESS
                })

            if (!userData) {
                throw new BadRequestException(
                    'Invalid user credentials , please register'
                )
            }

            request.authUser = {
                user: userData,
                token: decodedData
            }

            console.log(request)

        }
        else if (context['contextType'] == 'http') {
            const request = context.switchToHttp().getRequest();

            const { authorization } = request.headers

            if (!authorization) {
                throw new BadRequestException('Authorization header is required')
            }

            const [prefix, token] = authorization.split(' ')

            if (prefix !== 'Bearer') {
                throw new BadRequestException('Invalid authorization header')
            }

            const { user: userData, decodedData } = await this.tokenService.decodeToken({
                token,
                tokenType: TOKEN_TYPES.ACCESS
            })

            if (!userData) {
                throw new BadRequestException('Invalid user credentials , please register')
            }

            const authenticatedRequest = request

            authenticatedRequest.user = userData
            authenticatedRequest.accessTokenData = decodedData


        }
        return true;
    }
}