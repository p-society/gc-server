import { HooksObject } from '@feathersjs/feathers';
import validateOTP from '../users/hooks/validateOTP';

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateOTP()],
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
