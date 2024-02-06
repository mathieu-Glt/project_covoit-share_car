import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// type JwtPayload = {
//   sub: string;
//   email: string;
// };

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    // Call the constructor of the parent class (PassportStrategy)
    super({
      // Retrieve the JWT token from the "Authorization" header of the request (Bearer token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      // Secret key used to decode the token
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  // Method called when validating the JWT token
  validate(payload: any) {
    // Return the information extracted from the token payload
    return {userId: payload.sub , email: payload.email};
  }
}
