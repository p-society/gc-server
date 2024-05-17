// Initializes the `organizations` service on path `/organizations`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Organizations } from './organizations.class';
import createModel from '../../models/organizations.model';
import hooks from './organizations.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'organizations': Organizations & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/organizations', new Organizations(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('organizations');

  service.hooks(hooks);
}
