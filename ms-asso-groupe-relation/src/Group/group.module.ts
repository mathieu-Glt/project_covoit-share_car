import { AssociationModule } from 'src/Association/association.module';
import { GroupSchema } from '../Group/Schema/group.schema';
import { NatsMessengerModule } from '@app/nats-messenger';
import { GroupController } from './group.controller';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupService } from './group.service';

// Module responsible for managing GROUPS
@Module({
  imports: [
    // import database schema of GROUPS in Mongoose
    MongooseModule.forFeature([
      { name: 'Group', schema: GroupSchema }
    ]),
    // import the AssociationModule module as dependancy
    forwardRef(() => AssociationModule),
    // import NatsMessengerModule module for NATS messenging
    NatsMessengerModule
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports:[GroupService]
})
export class GroupModule{}
