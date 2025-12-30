import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserSetting } from "../models/UserSetting";
import { CreateUserSettingInput } from "../utils/CreateUserSettingInput";
import { mockUserSettings } from "src/__mocks__/mockUserSettings";
import { InjectRepository } from "@nestjs/typeorm";
import { UserSettingService } from "src/users/UserSettingService";
import { Inject } from "@nestjs/common";

@Resolver()
export class UserSettingsResolver {

    constructor(
        @Inject(UserSettingService)
        private userSettingService: UserSettingService,
    ){}


    @Mutation(returns => UserSetting)
    async createUserSettings(
        @Args('createUserSettingsData') createUserSettingsData:
        CreateUserSettingInput
    ){
        const userSetting = 
            await this.userSettingService.createUserSettings(createUserSettingsData);
        return userSetting;
    }
}