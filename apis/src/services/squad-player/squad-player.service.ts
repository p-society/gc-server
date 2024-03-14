// Initializes the `squad-player` service on path `/squad-player`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { SquadPlayer } from './squad-player.class';
import createModel from '../../models/squad-player.model';
import hooks from './squad-player.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'squad-player': SquadPlayer & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/squad-player', new SquadPlayer(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('squad-player');

  service.hooks(hooks);
}
