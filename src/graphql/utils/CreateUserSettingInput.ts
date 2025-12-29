import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateUserSettingInput{
    @Field((type) => Int)
    userId: number;

    // For creating we want a default value
    // For updates, we don't want a default value
    // the default value will override update
    @Field({ defaultValue: false, nullable: true })
    recieveNotifications: boolean;

    @Field({ defaultValue: false, nullable: true })
    recieveEmails: boolean;
}