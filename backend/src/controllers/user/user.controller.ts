import {BadRequestException, Body, Controller, Post} from '@nestjs/common';
import {User} from "../../models/User";
import {UserService} from "../../services/user/user.service";
import {ILoginDTO} from "../../dtos/LoginDTO";

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService) {
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
    async login(@Body() user: Required<ILoginDTO>){
        const result = await this.userService.login(user) as User;
        if(!result){
            throw new BadRequestException({context:"login", description:"Wrong login data"})
            // 400
        }
        return result;
    }
}
