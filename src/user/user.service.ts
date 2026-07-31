import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {


    checkHealth()
    {
     return "working "
    }
}
