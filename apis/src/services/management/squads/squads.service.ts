// Initializes the `management/squads` service on path `/management/squads`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Squads } from './squads.class';
import createModel from '../../../models/squads.model';
import hooks from './squads.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'management/squads': Squads & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/management/squads', new Squads(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('management/squads');

  service.hooks(hooks);
}
