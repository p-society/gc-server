import { Application } from '../declarations';
import users from './users/users.service';
import organizations from './organizations/organizations.service';
import keyGenerator from './key-generator/key-generator.service';
import formFields from './form-fields/form-fields.service';
import formFieldSections from './form-field-sections/form-field-sections.service';
import getForm from './get-form/get-form.service';
import gamesList from './games/list/list.service';
import orgGames from './org-games/org-games.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(organizations);
  app.configure(keyGenerator);
  app.configure(formFields);
  app.configure(formFieldSections);
  app.configure(getForm);
  app.configure(gamesList);
  app.configure(orgGames);
}
