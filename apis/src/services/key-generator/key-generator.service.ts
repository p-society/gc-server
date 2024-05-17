// Initializes the `key-generator` service on path `/key-generator`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { KeyGenerator } from './key-generator.class';
import createModel from '../../models/key-generator.model';
import hooks from './key-generator.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'key-generator': KeyGenerator & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/key-generator', new KeyGenerator(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('key-generator');

  service.hooks(hooks);
}
