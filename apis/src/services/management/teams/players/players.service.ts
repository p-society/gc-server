// Initializes the `management/teams/players` service on path `/management/teams/players`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { Players } from './players.class';
import createModel from '../../../../models/team-players.model';
import hooks from './players.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
  interface ServiceTypes {
    'management/teams/players': Players & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/management/teams/players', new Players(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('management/teams/players');

  service.hooks(hooks);
}
