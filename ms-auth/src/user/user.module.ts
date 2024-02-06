/* eslint-disable @typescript-eslint/no-unused-vars */
import { NatsMessengerModule } from '@app/nats-messenger';
import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './Schema/user.schema'
import { UserService } from './user.service'

// Module global pour la gestion des utilisateurs 
@Module({
  imports: [
    // Import necessary database schema for this module
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
    // Import the AuthModule with circular reference (forwardRef)
    forwardRef(() => AuthModule),
    // Import the NatsMessengerModule for communication with NATS
    NatsMessengerModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
