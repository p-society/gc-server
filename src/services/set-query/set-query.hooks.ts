import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import setQuery from '../../hooks/set-query';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ ],
    find: [],
    get: [],
    create: [setQuery('foo','1'),setQuery('bar','3')],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
