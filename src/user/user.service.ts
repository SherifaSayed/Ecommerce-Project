import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {


    checkHealth()
    {
     return "working "
    }
    profile(user:any)
    {
       return user;
    }
}
