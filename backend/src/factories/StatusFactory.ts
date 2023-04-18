import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status} from "../models/Status";

@Injectable()
export class StatusFactory implements OnApplicationBootstrap {
    constructor(
        @InjectModel(Status.name) private readonly statusModel: Model<Status>,
    ) {}

    async onApplicationBootstrap(): Promise<void> {
        const names = ["Active", "Disabled", "Awaiting", "Finished"]
        for(let name of names){
            const status = await this.statusModel.findOne({ name: name});
            if (!status) {
                const newStatus = new this.statusModel({ name: name });
                await newStatus.save();
            }
        }

    }
}
