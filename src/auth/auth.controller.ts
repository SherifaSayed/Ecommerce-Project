import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './DTO/add.user.dto';
import { SignIn } from './DTO/signInDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


   @Post('signUp')
  signUp(
    @Body() body: SignUpDto,
  ) {
    return this.authService.signUp(body);
  }
  @Post('signIN')
  signIn(@Body() body :SignIn)
  {
    return this.authService.signIn(body);
  }
}
