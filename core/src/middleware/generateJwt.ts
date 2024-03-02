import { Application } from '../declarations';
import { AuthenticationService } from '@feathersjs/authentication';
import jwt from 'jsonwebtoken';
import generateOtp from '../utils/generateOtp';

export function generateJWT(player: any, app: Application,otp:number): string {
  const authentication: AuthenticationService = app.service('authentication');
  
  const secret = authentication.configuration.secret;
  
  // Create a JWT token using the user's information and the secret key
  const token = jwt.sign({ player,otp }, secret, { expiresIn: '365d' }); // You can adjust expiresIn as needed
  
  return token;
}
