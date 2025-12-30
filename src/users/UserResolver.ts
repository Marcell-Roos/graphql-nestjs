// populate your fields with the correct data

import { Resolver,Query, Args, Int, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { User } from "../graphql/models/User";
import { mockUsers } from "src/__mocks__/mockUsers";
import { UserSetting } from "../graphql/models/UserSetting";
import { mockUserSettings } from "src/__mocks__/mockUserSettings";
import { CreateUserInput } from "../graphql/utils/CreateUserInput";
import { Inject } from "@nestjs/common";
import { UserService } from "./UserService";
import { UserSettingService } from "./UserSettingService";


// mock db auto id generation
export let incrementalId: number = 3

// Define Relational Parent for the Resolver
@Resolver((of: User) => User)
export class UserResolver {
    constructor(
       @Inject(UserService) private userService: UserService,
       @Inject(UserSettingService) private userSettingService: UserSettingService,
    ){}

    // methods to query data

    @Query((returns) => User, {nullable: true})
    getUserById(@Args('id', {type: ()=> Int}) id: number){
        return this.userService.getUserById(id);
    }

    // Although we get a promise back
    // we do not need async / await as GraphQL will handle this
    @Query(() => [User])
    getUsers(){
        return this.userService.getUsers();
    }

    // method name of getUserSettings will override
    // 'setting' field in GrahQL query, generating it as own field
    // so we set name to settings

    // Resolve Field may not be needed in relational databases
    // as ORM such as TypeORM will resolve by default
    // Could be used for indirect associations, but rather write custom queries here
    // Client Side will act the same, will still be able to avoid over fetching problem
    
    // '@Parent' Defines parent-child relationship

    // Below causes multiple queries
    // @ResolveField(returns => UserSetting, {name: 'settings', nullable: true})
    // getUserSettings(@Parent() user: User){
    //     return this.userSettingService.getUserSettingByUserId(user.id);
    // }

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
        
        return this.userService.createUser(createUserData);
    }
}