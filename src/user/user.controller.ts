import { Controller, Get, Logger, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard, RolesGuard } from 'src/Guards';
import type { UserDocument} from 'src/Common'
 import  {UserRole } from 'src/Common';
import { Auth, Roles, User } from 'src/Common/Decorators';
import { UnifiedResponseInterceptor } from 'src/Common/interceptor';

@Controller('user')
export class UserController {
   private readonly logger = new Logger(UserController.name)
  constructor(private readonly userService: UserService) {}

@Get()
chechHealth()
{
return this.userService.checkHealth();
}

 @Get('profile')
@Auth(UserRole.USER)
async profile(
  @User() user: UserDocument
) {
  console.log({ user });

  const result = await this.userService.profile(user);

  return {
    message: 'Profile retrieved successfully',
    data: result,
    meta: {
      timestamp: new Date().toISOString(),
      path: '/user/profile'
    }
  };
}


@Get('list')
async list() {
  const result = await this.userService.list();
   this.logger.debug('user retrived successfully')
  return {
    message: 'Users retrieved successfully',
    data: result,
    meta: {
      timestamp: new Date().toISOString(),
      path: '/user/list'
    }
  };
}

}
