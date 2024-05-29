// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import RolesEnum from '../constants/roles.enum';
import { Forbidden } from '@feathersjs/errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// permit-platform-super-admin.ts
const Permit = (...requiredRoles: RolesEnum[]): Hook => async (context: HookContext): Promise<HookContext> => {
  const { user } = context.params;
  if (!user || !requiredRoles.find(role => role === user.type)) {
    throw new Forbidden('Permission denied');
  }
  return context;
};

export default Permit;