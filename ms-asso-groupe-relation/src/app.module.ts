import { AssociationModule } from './Association/association.module';
import { RelationModule } from './Relation/relation.module';
import { NatsMessengerModule } from '@app/nats-messenger';
import { GroupModule } from './Group/group.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

//Main module from the application asso-groupe-relation
@Module({
  imports: [
    // Configure global application settings using ConfigModule
    ConfigModule.forRoot({
      isGlobal: true,
      //TODO set to true for PRODUCTION
      //cache: true,
    }),
    // Configure MongooseModule to connect to the database
    MongooseModule.forRoot(`${process.env.URI_BDD}?retryWrites=true&w=majority`), 
    // Import modules for associations, relations, and groups
    AssociationModule,
    RelationModule, 
    GroupModule, 
    // Import the module for NATS messaging
    NatsMessengerModule
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
