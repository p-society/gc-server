import { AuthenticationService } from '@feathersjs/authentication';
import jwt from 'jsonwebtoken';
import { Application } from '../declarations';

export function decodeJWT(token: string, app: Application): any {
  try {

    const authentication: AuthenticationService = app.service('authentication');

    // Get the JWT secret key configured in your FeatherJS application
    const secret = authentication.configuration.secret;
    // Decode the JWT token using the provided secret key
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    // If decoding fails (e.g., due to an invalid token or secret), return null or handle the error as needed
    console.error('Error decoding JWT token:', error);
    return null;
  }
}
