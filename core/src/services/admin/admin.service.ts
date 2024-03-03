// Initializes the `admin` service on path `/admin`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Admin } from './admin.class';
import createModel from '../../models/admin.model';
import hooks from './admin.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'admin': Admin & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/admin', new Admin(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('admin');

  service.hooks(hooks);
}
