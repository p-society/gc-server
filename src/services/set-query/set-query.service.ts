// Initializes the `setQuery` service on path `/set-query`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { SetQuery } from './set-query.class';
import createModel from '../../models/set-query.model';
import hooks from './set-query.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'set-query': SetQuery & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/set-query', new SetQuery(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('set-query');

  service.hooks(hooks);
}
