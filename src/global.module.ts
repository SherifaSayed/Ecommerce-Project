import { Global, Module } from "@nestjs/common";
import { userModel } from "./DB/models";
import { FileService, TokenService } from "./Common/Services";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "./DB/Repositories";
import { S3ClientService } from "./Common/Clients";
@Global()
@Module({
imports:[userModel],
providers:[ TokenService,
    JwtService,
    UserRepository,
    FileService,
    S3ClientService],
exports:[ TokenService,
    JwtService,
    UserRepository,
    FileService,
    S3ClientService]
})
export class GlobalModule{}