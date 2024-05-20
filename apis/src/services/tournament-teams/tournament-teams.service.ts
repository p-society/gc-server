// Initializes the `tournament-teams` service on path `/tournament-teams`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { TournamentTeams } from './tournament-teams.class';
import createModel from '../../models/tournament-teams.model';
import hooks from './tournament-teams.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'tournament-teams': TournamentTeams & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/tournament-teams', new TournamentTeams(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('tournament-teams');

  service.hooks(hooks);
}
