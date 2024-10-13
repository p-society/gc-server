// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { RolesEnum } from '../constants/roles-enum';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (requiredRoles:Array<String>): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const {data}=context;
    if(!requiredRoles.includes(RolesEnum[data.type]))
      throw new BadRequest('You are not Authenticated');
    return context;
  };
};
