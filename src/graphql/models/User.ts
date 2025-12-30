import { Field, Int, ObjectType } from "@nestjs/graphql";
import { UserSetting } from "./UserSetting";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'users'})
// Define as GraphQL Object
@ObjectType()
export class User{

    @PrimaryGeneratedColumn()
    // Annotate @Field() for GraphQL to see this
    // as returnable data of the Object

    // By default number will resolve to float
    // specify (type) => Int to ensure id is a Integer333
    @Field((type) => Int)
    id: number; // Scalar

    @Column()
    @Field()
    username: string; // Scalar

    @Column({ nullable: true })
    @Field({ nullable: true })
    // adding the '?' character allows the field to be null
    displayname?: string; // Scalar

    // Set relation to UserSetting
    @OneToOne(()=> UserSetting)
    @JoinColumn()
    @Field({ nullable: true })
    settings?: UserSetting; // Object
}