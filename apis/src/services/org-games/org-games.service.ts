// Initializes the `org-games` service on path `/org-games`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { OrgGames } from './org-games.class';
import createModel from '../../models/org-games.model';
import hooks from './org-games.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'org-games': OrgGames & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/org-games', new OrgGames(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('org-games');

  service.hooks(hooks);
}
