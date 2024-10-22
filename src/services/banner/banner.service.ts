// Initializes the `banner` service on path `/banner`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Banner } from './banner.class';
import createModel from '../../models/banner.model';
import hooks from './banner.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'banner': Banner & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/banner', new Banner(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('banner');

  service.hooks(hooks);
}
