// Initializes the `management/captain` service on path `/management/captain`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Captain } from './captain.class';
import createModel from '../../../models/captain.model';
import hooks from './captain.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'management/captain': Captain & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/management/captain', new Captain(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('management/captain');

  service.hooks(hooks);
}
