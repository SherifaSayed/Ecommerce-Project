import { UserDocument } from "src/Common";
import BaseRepository from "./base.repository"
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";


@Injectable()
export default class UserRepository extends BaseRepository<UserDocument>
{
   constructor(@InjectModel(User.name) private userModel:Model<UserDocument>)
   {
   super(userModel);
   }


}