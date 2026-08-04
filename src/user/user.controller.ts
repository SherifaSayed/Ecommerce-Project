import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard, RolesGuard } from 'src/Guards';
import type { UserDocument} from 'src/Common'
 import  {UserRole } from 'src/Common';
import { Auth, Roles, User } from 'src/Common/Decorators';

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
 userprofile(@User()  user:UserDocument)
 {
   

  return this.userService.profile(user);
 }
}
