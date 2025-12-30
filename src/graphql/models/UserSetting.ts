import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity({ name: 'user_settings'})
@ObjectType()
export class UserSetting {

    // Specify Relation of UserSetting to User
    @PrimaryColumn()
    @Field((type) => Int)
    userId: number;

    @Column({ default: false })
    @Field({ defaultValue: false })
    recieveNotifications: boolean;

    @Column({ default: false })
    @Field({ defaultValue: false })
    recieveEmails: boolean;
}