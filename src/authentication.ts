import { ServiceAddons } from '@feathersjs/feathers';
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';

import { Application } from './declarations';

declare module './declarations' {
  interface ServiceTypes {
    'authentication': AuthenticationService & ServiceAddons<any>;
  }
}

class ServerEmailStrategy extends LocalStrategy {
  async comparePassword(user: any, code: string): Promise<any> {
    return {
      email: user.email,
    };
  }
}


export default function(app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('server-email', new ServerEmailStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
}
