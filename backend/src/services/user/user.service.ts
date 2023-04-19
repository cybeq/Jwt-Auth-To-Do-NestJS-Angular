import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../../models/User";
import {ILoginDTO} from "../../dtos/LoginDTO";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }
    async create(user:User):Promise<User>
    {
            const lenghtValidation = [{n:'password',o:user.password}, {n:'email', o:user.email}, {n:'name', o:user.name}];
            lenghtValidation.forEach(prop => {
                if(!prop.o || String(prop.o).length<4){
                    throw new BadRequestException({context:prop.n, description:`The ${prop.n} field must contain at least 4 characters`})
                    // 400
                }
            })
            user.password = await bcrypt.hash(user.password,10)
            const createdUser = new this.userModel(user);
            await createdUser.save().catch(e=>{
                throw new ConflictException({context:'email', description:'Email already taken'})
                // 409
            });
            return createdUser;
    }
    async login(user:ILoginDTO):Promise<User> {
        const foundUser = await this.userModel.findOne({email: user.email}) as User;
        if(!foundUser){
            return null;
        }
        const isPasswordValid = await bcrypt.compare(user.password, foundUser.password);
        if(!isPasswordValid){
            return null;
        }
        return foundUser
    }

}
