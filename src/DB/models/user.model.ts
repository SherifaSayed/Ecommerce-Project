import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas";
import { default as SecurityService } from "src/Common/Services/security.service";
 const securityService= new SecurityService();

export const userModel= MongooseModule.forFeatureAsync([{name:User.name, useFactory:()=>{
    const userSchema=UserSchema;
     userSchema.pre('save', async function (next){
        if(this.isModified('password')){
            this.password=await securityService.hash(this.password,10)
        }
        next();
     })

     return userSchema
    
    
    }}])