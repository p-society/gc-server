// Initializes the `team` service on path `/team`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Team } from './team.class';
import createModel from '../../models/team.model';
import hooks from './team.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'team': Team & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/team', new Team(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('team');

  service.hooks(hooks);
}
