// Initializes the `games/badminton` service on path `/games/badminton`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Badminton } from './badminton.class';
import createModel from '../../../models/badminton.model';
import hooks from './badminton.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'games/badminton': Badminton & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/games/badminton', new Badminton(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('games/badminton');

  service.hooks(hooks);
}
