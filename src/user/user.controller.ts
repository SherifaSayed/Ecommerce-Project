import { Controller, Get, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard, RolesGuard } from 'src/Guards';
import type { UserDocument} from 'src/Common'
 import  {UserRole } from 'src/Common';
import { Auth, Roles, User } from 'src/Common/Decorators';
import { UnifiedResponseInterceptor } from 'src/Common/interceptor';

@Controller('user')
export class UserController {
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
}
