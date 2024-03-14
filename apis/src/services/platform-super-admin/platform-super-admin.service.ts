// Initializes the `platform-super-admin` service on path `/platform-super-admin`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { PlatformSuperAdmin } from './platform-super-admin.class';
import createModel from '../../models/platform-super-admin.model';
import hooks from './platform-super-admin.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'platform-super-admin': PlatformSuperAdmin & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/platform-super-admin', new PlatformSuperAdmin(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('platform-super-admin');

  service.hooks(hooks);
}
