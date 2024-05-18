// Initializes the `get-form` service on path `/get-form`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { GetForm } from './get-form.class';
import hooks from './get-form.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'get-form': GetForm & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/get-form', new GetForm(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('get-form');

  service.hooks(hooks);
}
