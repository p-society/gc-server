import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import RolesEnum from '../../constants/roles.enum';
import Permit from '../../hooks/permit';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [Permit(RolesEnum.PLATFORM_SUPER_ADMIN)],
    update: [],
    patch: [],
    remove: [Permit(RolesEnum.PLATFORM_SUPER_ADMIN)]
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
