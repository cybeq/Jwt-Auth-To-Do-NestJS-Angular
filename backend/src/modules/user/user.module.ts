import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../../models/User";
import {UserController} from "../../controllers/user/user.controller";
import {UserService} from "../../services/user/user.service";
import {JwtService} from "@nestjs/jwt";



@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [UserService, JwtService],
})
export class UserModule {


}
