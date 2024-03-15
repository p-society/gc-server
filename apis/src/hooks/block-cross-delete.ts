// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import RolesEnum from '../constants/roles.enum';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options: object = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {


    const targetId = context.id;
    const { user } = context.params;
    // @ts-ignore
    if(user.role === RolesEnum.PLATFORM_SUPER_ADMIN) return context
    // @ts-ignore
    const initiatorId = user._id.toString();
    if(initiatorId === targetId) return context;
    throw new BadRequest('users cannot delete other users')
  };
};
