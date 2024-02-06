import { Module, forwardRef } from '@nestjs/common';
import { RelationController } from './relation.controller';
import { RelationSchema } from './Schema/relation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RelationService } from './relation.service';
import { AssociationModule } from 'src/Association/association.module';
import { NatsMessengerModule } from '@app/nats-messenger';

//Module in charge of handling RELATIONS 
@Module({
  imports:[
    // import the database schema for RELATIONS in Mongoose
    MongooseModule.forFeature([
      { name: 'Relations', schema: RelationSchema }
    ]),
    // import the AssociationModule module as dependency 
    forwardRef(() => AssociationModule),
    // import NatsMessengerModule module for NATS messenging
    NatsMessengerModule
  ],
  controllers: [RelationController],
  providers: [RelationService],
  exports: [RelationService],
})
export class RelationModule{}

