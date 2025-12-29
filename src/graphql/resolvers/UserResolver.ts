// populate your fields with the correct data

import { Resolver,Query, Args, Int, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { User } from "../models/User";
import { mockUsers } from "src/__mocks__/mockUsers";
import { UserSetting } from "../models/UserSetting";
import { mockUserSettings } from "src/__mocks__/mockUserSettings";
import { CreateUserInput } from "../utils/CreateUserInput";


// mock db auto id generation
export let incrementalId: number = 3

// Define Relational Parent for the Resolver
@Resolver((of: User) => User)
export class UserResolver {
    // methods to query data

    @Query((returns) => User, {nullable: true})
    getUserById(@Args('id', {type: ()=> Int}) id: number){
        return mockUsers.find(user => user.id === id);
    }

    @Query(() => [User])
    getUsers(){
        return mockUsers;
    }

    // method name of getUserSettings will override
    // 'setting' field in GrahQL query, generating it as own field
    // so we set name to settings

    // Resolve Field may not be needed in relational databases
    // as ORM such as TypeORM will resolve by default
    // Could be used for indirect associations, but rather write custom queries here
    // Client Side will act the same, will still be able to avoid over fetching problem
    @ResolveField(returns => UserSetting, {name: 'settings', nullable: true})
    // '@Parent' Defines parent-child relationship

    getUserSettings(@Parent() user: User){
        return mockUserSettings.find(setting => setting.userId === user.id);
    }

    // Add new user in memory
    // Mutation allows Create / Update
    @Mutation(returns => User)
    // Can use Args but not ideal, rather use InputType

    // OLD UGLY WAY
    /*
        createUser(
        @Args('username') username: string, 
        @Args('displayname', {nullable: true}) displayname: string,
        ){
    */
    createUser(
        @Args('createUserData') createUserData: 
            CreateUserInput
    ){
        // Deconstruct Playload
        const {username, displayname } = createUserData 

        const newUser = { 
            username, 
            displayname, 
            id: ++incrementalId
        }

        mockUsers.push(newUser);
        
        return newUser
    }

    /*
        id: 1,
        username: "Marcell",
        displayname: "Roos"
    */
}