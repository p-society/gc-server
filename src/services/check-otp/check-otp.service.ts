// Initializes the `check-otp` service on path `/check-otp`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { CheckOtp } from './check-otp.class';
import hooks from './check-otp.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'check-otp': CheckOtp & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/check-otp', new CheckOtp(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('check-otp');

  service.hooks(hooks);
}
