// Initializes the `tournaments` service on path `/tournaments`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Tournaments } from './tournaments.class';
import createModel from '../../models/tournaments.model';
import hooks from './tournaments.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'tournaments': Tournaments & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/tournaments', new Tournaments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('tournaments');

  service.hooks(hooks);
}
