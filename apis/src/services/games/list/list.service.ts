// Initializes the `games/list` service on path `/games/list`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { List } from './list.class';
import createModel from '../../../models/list.model';
import hooks from './list.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'games/list': List & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/games/list', new List(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('games/list');

  service.hooks(hooks);
}
