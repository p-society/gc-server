import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import permit from '../../hooks/permit';

// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [  ],
    find: [],
    get: [permit(['ADMIN','SUPERADMIN'])],
    create: [permit(['ADMIN','SUPERADMIN'])],
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
