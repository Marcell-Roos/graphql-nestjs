import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './graphql/models/User';
import { UserSetting } from './graphql/models/UserSetting';
import { UsersModule } from './users/users.module';

// TEST has a trailing whitespace to make the package.json script look pretty
const ENVIRONMENT: string | undefined = process.env.NODE_ENV?.trim();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql'
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ENVIRONMENT === "TEST" ? 'test.sqlite' : 'db.sqlite' , // File name for your SQLite database
      entities: [User,UserSetting],
      synchronize: true,
      logging: ENVIRONMENT === "DEBUG",
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

