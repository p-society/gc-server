// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, data, params } = context;
    const { strategy, email, password } = data;
    const authService = app.service('authentication');
    try {
      const authresult = await authService.create({
        strategy: strategy,
        email: email,
        password: password
      }, params)
      console.log('AuthResult : ', authresult)
      context.result = authresult
    }catch(err){
      throw new BadRequest('Wrong Credentials')
    }
    
    return context

  };
};
