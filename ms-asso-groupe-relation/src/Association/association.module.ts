import { AssociationSchema } from './Schema/association.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { AssociationController } from './association.controller';
import { AssociationService } from './association.service';
import { GroupModule } from 'src/Group/group.module';
import { NatsMessengerModule } from '@app/nats-messenger';

//Module in charge of handling ASSOCIATIONS
@Module({
    imports: [
        // import the database schema for ASSOCIATIONS in Mongoose
        MongooseModule.forFeature([
            { name: 'Associations', schema: AssociationSchema},
        ]),
        // import the GroupModule module as dependency 
        forwardRef(() => GroupModule),
        // import NatsMessengerModule module for NATS messenging
        NatsMessengerModule
    ],
    controllers: [AssociationController],
    providers: [AssociationService],
    exports: [AssociationService],
})
export class AssociationModule { }



