// Initializes the `send_otp` service on path `/send_otp`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { SendOtp } from './send_otp.class';
import hooks from './send_otp.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'send_otp': SendOtp & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/send_otp', new SendOtp(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('send_otp');

  service.hooks(hooks);
}
