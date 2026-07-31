import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";


export default class SecurityService{
 
hash(plainText:string, salt:number)
{
    return hash(plainText, salt)
}


public compare(plainText:string,hash:string )
{
    return compare(plainText, hash)
}

}