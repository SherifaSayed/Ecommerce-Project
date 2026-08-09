// import { Injectable } from "@nestjs/common";
// import BaseRepository from "./base.repository";
// import { OTPTypes } from "src/Common";
// import { InjectModel } from "@nestjs/mongoose";

// @Injectable()
// export class OTPRepository extends BaseRepository<OTPTypes> {
//   constructor(
//     @InjectModel(.name)
//     private readonly otpModel: Model<OtpType>,
//   ) {
//     super(otpModel);
//   }

//   async CreateOtp({
//     userId,
//     otp,
//     otpType,
//     expiryTime,
//   }: ICreateOptions) {
//     return this.create({
//       userId,
//       otp: Hash(otp),
//       otpType,
//       expiryTime: expiryTime || new Date(Date.now() + 1000 * 60 * 10),
//     });
//   }
// }