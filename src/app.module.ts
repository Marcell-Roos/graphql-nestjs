import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './graphql/resolvers/UserResolver';
import { UserSettingsResolver } from './graphql/resolvers/UserSettingResolver';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql'
    })
  ],
  controllers: [],
  providers: [UserResolver, UserSettingsResolver],
})
export class AppModule {}

