import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { AuthUserTokenSchema } from './Schema/authUserToken.schema';
import { RefreshTokenSchema } from './Schema/refreshToken.schema';
import { Global, Module, forwardRef } from '@nestjs/common';
import { NatsMessengerModule } from '@app/nats-messenger';
import { UserSchema } from 'src/user/Schema/user.schema';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Global module for authentication management
@Global()
@Module({
  imports: [
    // Import necessary database schemas for this module
    MongooseModule.forFeature([
    { name: 'RefreshToken', schema: RefreshTokenSchema },
    { name: 'AuthUserToken', schema: AuthUserTokenSchema },
    { name: 'User', schema: UserSchema },

  ]),
    // Import the UserModule with circular reference (forwardRef)
    forwardRef(() => UserModule),
    // Configure JwtModule for JWT management
    JwtModule.register({
      global: true, // Makes the module global for use everywhere
      secret: process.env.JWT_ACCESS_SECRET, // Secret key to sign tokens
      signOptions: { expiresIn: '15m' },
    }),
    // Import the NatsMessengerModule for communication with NATS
    NatsMessengerModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService, // Provides the authentication management service
    AccessTokenStrategy, // Strategy for validating access tokens
    RefreshTokenStrategy, // Strategy for validating refresh tokens

  ],
  exports: [AuthService], // Export the AuthService service for external us
})
export class AuthModule { }


