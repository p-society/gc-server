// Initializes the `squad` service on path `/squad`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Squad } from './squad.class';
import createModel from '../../models/squad.model';
import hooks from './squad.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'squad': Squad & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/squad', new Squad(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('squad');

  service.hooks(hooks);
}
