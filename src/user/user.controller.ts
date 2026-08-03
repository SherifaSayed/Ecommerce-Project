import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard, RolesGuard } from 'src/Guards';
import { UserRole } from 'src/Common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Get()
chechHealth()
{
return this.userService.checkHealth();
}

 @Get('profile')
 @UseGuards(AuthGuard, new RolesGuard([UserRole.USER]))
 userprofile(@Req()request:any)
 {
    console.log(request.user);

  return this.userService.profile(request.user);
 }
}
