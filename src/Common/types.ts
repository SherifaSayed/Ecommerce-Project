import { HydratedDocument } from "mongoose";
import { User } from "src/DB/schemas/user.schema";


export type UserDocument = HydratedDocument<User>