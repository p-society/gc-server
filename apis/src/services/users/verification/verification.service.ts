// Initializes the `users/verification` service on path `/users/verification`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Verification } from './verification.class';
import hooks from './verification.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'users/verification': Verification & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users/verification', new Verification(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users/verification');

  service.hooks(hooks);
}
