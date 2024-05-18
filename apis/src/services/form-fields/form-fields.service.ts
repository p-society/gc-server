// Initializes the `form-fields` service on path `/form-fields`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { FormFields } from './form-fields.class';
import createModel from '../../models/form-fields.model';
import hooks from './form-fields.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'form-fields': FormFields & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/form-fields', new FormFields(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('form-fields');

  service.hooks(hooks);
}
