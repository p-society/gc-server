// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const {query}=context.params;
    if(query){
      const {data}=context;
      if(query.user_id)
      data.createdBy=query.user_id;
      else
      throw new BadRequest('No user_id found');
    }
    return context;
  };
};
