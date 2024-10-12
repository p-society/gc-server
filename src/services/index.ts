import { Application } from '../declarations';
import users from './users/users.service';
import permit from './permit/permit.service';
import setQuery from './set-query/set-query.service';
import setCreatedBy from './set-created-by/set-created-by.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(permit);
  app.configure(setQuery);
  app.configure(setCreatedBy);
}
