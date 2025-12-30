import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/graphql/models/User";
import { CreateUserInput } from "src/graphql/utils/CreateUserInput";
import { Repository } from "typeorm";

@Injectable() // Annotates as Provider for NestJS, creates signleton
export class UserService{
    constructor(
        // Injects repository for entity we are working with

        // User Repository
        @InjectRepository(User) private userRepository: 
        Repository<User>

    ){}

    getUsers(): Promise<User[]> {
         return this.userRepository.find({ relations: ['settings']});
        // Below will cause multiple queries to execute
        // return this.userRepository.find();
    }

    createUser(createUserDate: CreateUserInput): Promise<User> {
        const newUser = this.userRepository.create(createUserDate);
        return this.userRepository.save(newUser);
    }

    getUserById(id: number): Promise<User | null>{
        return this.userRepository.findOne(
            { 
                where: {id: id}, 
                relations: ['settings']
            });
        // below query will execute multiple queries
        // return this.userRepository.findOneBy({id: id});
    }
}