// Initializes the `match` service on path `/match`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Match } from './match.class';
import createModel from '../../models/match.model';
import hooks from './match.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'match': Match & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/match', new Match(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('match');

  service.hooks(hooks);
}
