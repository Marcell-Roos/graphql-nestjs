import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { createUserQuery, getUsersQuery } from '../src/utils/queries/graphql';
import { DataSource } from 'typeorm';
import { after } from 'node:test';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      // Drop test Database Data and initialize the schema
      const dataSource = app.get(DataSource);
      await dataSource.synchronize(true);
      await app.init();
    });

  // Cleanup for graceful exit
  afterAll(async ()=>{

    // Cleanup DB and connections
    const dataSource = app.get(DataSource);
    if(dataSource){
      // Drop all database tables
      await dataSource.dropDatabase(); // Does not due much since we use SQLite
      // Closing DB Connection
      await dataSource.destroy();
    }

    // Closing App
    await app.close();

  });



    describe('users', () => {
      it('should query users and return 0 users', () => {
        return request(app.getHttpServer())
                .post('/graphql')
                .send({query: getUsersQuery})
                .expect((res) => {
                  let data = res.body.data.getUsers;
                  expect(data).toEqual([]);
                  expect(data).toHaveLength(0);
                });
        });

      it('should create a user using the create user mutation', () => {
        return request(app.getHttpServer())
                .post('/graphql')
                .send({query: createUserQuery})
                .expect(200)
                .expect((res)=>{
                  let data = res.body.data.createUser;
                  expect(data).toEqual({
                    id: 1,
                    username: "Klara",
                    displayname: "The Slayer"
                  })
                });
        });

        it('should query users and return 1 users', () => {
        return request(app.getHttpServer())
                .post('/graphql')
                .send({query: getUsersQuery})
                .expect((res) => {
                  let data = res.body.data.getUsers;
                  expect(data).toHaveLength(1);
                });
        });

        
    })

    

});
