// Initializes the `setCreatedBy` service on path `/set-created-by`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { SetCreatedBy } from './set-created-by.class';
import createModel from '../../models/set-created-by.model';
import hooks from './set-created-by.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'set-created-by': SetCreatedBy & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/set-created-by', new SetCreatedBy(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('set-created-by');

  service.hooks(hooks);
}
