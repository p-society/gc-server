// Initializes the `management/captain/link-generator` service on path `/management/captain/link-generator`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { LinkGenerator } from './link-generator.class';
import createModel from '../../../../models/link-generator.model';
import hooks from './link-generator.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
  interface ServiceTypes {
    'management/captain/link-generator': LinkGenerator & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/management/captain/link-generator', new LinkGenerator(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('management/captain/link-generator');

  service.hooks(hooks);
}
