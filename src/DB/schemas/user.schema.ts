
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';
import { Gender, UserRole } from 'src/Common';

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class User {
  @Prop({
    type: String,
    required: true,
    trim: true,
    minLength: [3, 'First name must be at least 3 characters long'],
    maxLength: [50, 'First name must be at most 50 characters long'],
  })
  firstName!: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minLength: [3, 'Last name must be at least 3 characters long'],
    maxLength: [50, 'Last name must be at most 50 characters long'],
  })
  lastName!: string;
  @Virtual( {get:function(this:User){return `${this.firstName} ${this.lastName}`}})
  fullName!:string;
  @Prop({
    type: String,
    required: true,
    index:{name:"idx_email", unique:true}
  })
  email!: string;

  @Prop({type: String,required: true})
  password!: string;
@Prop({ type: Boolean, default: false })
  isVerified!: boolean;

@Prop({ type: String, enum: Gender })
   gender!: Gender;
  @Prop({type: String,enum:UserRole,default:UserRole.USER})
  role!: string;

  @Prop({type: String,required: true, index:{name:"idx_phone", unique:true}})
  phoneNumber!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);