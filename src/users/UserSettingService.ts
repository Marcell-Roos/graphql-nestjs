import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../graphql/models/User";
import { UserSetting } from "../graphql/models/UserSetting";
import { CreateUserSettingInput } from "../graphql/utils/CreateUserSettingInput";
import { Repository } from "typeorm";

@Injectable()
export class UserSettingService{
    constructor(
        @InjectRepository(UserSetting) 
        private userSettingReposiory: Repository<UserSetting>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    getUserSettingByUserId(userId: number): Promise<UserSetting|null>{
        return this.userSettingReposiory.findOneBy({userId: userId});
    }

    async createUserSettings(userSettingsData: CreateUserSettingInput): Promise<UserSetting>{
        const findUser = await this.userRepository.findOneBy({id: userSettingsData.userId});

        if(!findUser) throw new Error('User not found');

        const newUserSetting = 
            this.userSettingReposiory.create(userSettingsData);

        const savedSettings = await this.userSettingReposiory.save(newUserSetting);

        findUser.settings = savedSettings;
        await this.userRepository.save(findUser);
        return savedSettings;
    }
}
