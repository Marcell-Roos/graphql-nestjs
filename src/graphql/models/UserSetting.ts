import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserSetting {

    // Specify Relation of UserSetting to User
    @Field((type) => Int)
    userId: number;

    @Field({ defaultValue: false })
    recieveNotifications: boolean;

    @Field({ defaultValue: false })
    recieveEmails: boolean;
}