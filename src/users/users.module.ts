import { Module } from "@nestjs/common";
import { UserResolver } from "./UserResolver";
import { UserService } from "./UserService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSettingService } from "./UserSettingService";
import { User } from "../graphql/models/User";
import { UserSetting } from "../graphql/models/UserSetting";
import { UserSettingsResolver } from "../graphql/resolvers/UserSettingResolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            UserSetting,
        ])
    ],
    providers: [
        UserResolver,
        UserService, 
        UserSettingService,
        UserSettingsResolver,
    ],
})
export class UsersModule {

}
