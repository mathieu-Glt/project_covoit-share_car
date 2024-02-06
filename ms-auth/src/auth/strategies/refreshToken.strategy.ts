import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
  constructor() {
    // Call the constructor of the parent class (PassportStrategy)
    super({
      // Retrieve the JWT token from the "Authorization" header (Bearer token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Secret key used to decode the token
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      // Allow passing the request to the validation function
      passReqToCallback: true,
    });
  }

  // Method called when validating the JWT token
  validate(req: Request, payload: any) {
    // Retrieve the refreshToken from the header and remove the "Bearer" prefix
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    // Return the information extracted from the token payload along with the refresh token
    return { ...payload, refreshToken };
  }
}
