// Initializes the `management/matches` service on path `/management/matches`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Matches } from './matches.class';
import createModel from '../../../models/matches.model';
import hooks from './matches.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'management/matches': Matches & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/management/matches', new Matches(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('management/matches');

  service.hooks(hooks);
}
