import {BadRequestException, Body, Controller, Post, Res} from '@nestjs/common';
import {User} from "../../models/User";
import {UserService} from "../../services/user/user.service";
import {ILoginDTO} from "../../dtos/LoginDTO";
import { JwtService } from '@nestjs/jwt';
import {jwtConstants} from "../../constants";
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService,
                private readonly jwtService:JwtService
                ) {
    }
    @Post('/create')
    async create(@Body() user: User): Promise<User> {
        const result = this.userService.create(user);
        return result
            .then(createdUser => {
                console.log('User created successfully:', createdUser);
                return createdUser;
            })
            .catch(error => {
                console.error('Failed to create user:', error);
                throw error;
            });
        // if created, code 201
    }

    @Post('/login')
    async login(@Body() user: Required<ILoginDTO>): Promise<{status:boolean, token:string}>{
        const result = await this.userService.login(user) as User;
        if(!result){
            throw new BadRequestException({context:"login", description:"Wrong login data"})
            // 400
        }
        const token = await this.jwtService.signAsync({id:result.id} ,{secret:jwtConstants.secret});
        return {status:true, token}
    }
}
