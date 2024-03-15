import { HooksObject } from '@feathersjs/feathers';
import * as local from '@feathersjs/authentication-local';
import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const { hashPassword, protect } = local.hooks;
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      protect('password')
    ],
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
