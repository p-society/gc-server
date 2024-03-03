// Initializes the `team-player` service on path `/team-player`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { TeamPlayer } from './team-player.class';
import createModel from '../../models/team-player.model';
import hooks from './team-player.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'team-player': TeamPlayer & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/team-player', new TeamPlayer(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('team-player');

  service.hooks(hooks);
}
