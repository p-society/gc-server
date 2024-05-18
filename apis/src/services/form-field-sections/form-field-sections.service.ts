// Initializes the `form-field-sections` service on path `/form-field-sections`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { FormFieldSections } from './form-field-sections.class';
import createModel from '../../models/form-field-sections.model';
import hooks from './form-field-sections.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'form-field-sections': FormFieldSections & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/form-field-sections', new FormFieldSections(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('form-field-sections');

  service.hooks(hooks);
}
