import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/DB/Repositories';
import type { Cache } from 'cache-manager';

@Injectable()
export class UserService {
   constructor(
    @Inject(CACHE_MANAGER) private cacheManager:Cache,
    private userRepository:UserRepository){}

    checkHealth()
    {
     return "working "
    }
    profile(user:any)
    {
       return user;
    }

async  list()
   {

    const cacheResult= await this.cacheManager.get('user')
    if(cacheResult)
    {
        return cacheResult;
    }
    const users= await this.userRepository.findDocuments({})
    await this.cacheManager.set('users', users)
    return users;

   }


}
