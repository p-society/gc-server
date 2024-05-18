import { NotAuthenticated } from '@feathersjs/errors';
import {Hook} from '@feathersjs/feathers';

const setOrganizationQuery =
  (key = 'organization', strict = true): Hook =>
    (context) => {
      const {
        params: { query, user, provider },
      } = context;

      if (typeof provider === 'undefined') return context;

      if (!user) {
        if (!strict) return context;
        throw new NotAuthenticated();
      }

      if (user.organization && query) query[key] = user.organization;

      return context;
    };

export default setOrganizationQuery;