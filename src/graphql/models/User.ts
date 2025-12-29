import { Field, Int, ObjectType } from "@nestjs/graphql";
import { UserSetting } from "./UserSetting";

// Define as GraphQL Object
@ObjectType()
export class User{
    // Annotate @Field() for GraphQL to see this
    // as returnable data of the Object

    // By default number will resolve to float
    // specify (type) => Int to ensure id is a Integer333
    @Field((type) => Int)
    id: number; // Scalar

    @Field()
    username: string; // Scalar

    // adding the '?' character allows the field to be null
    @Field({ nullable: true })
    displayname?: string; // Scalar

    // Set relation to UserSetting
    @Field({ nullable: true })
    settings?: UserSetting; // Object
}