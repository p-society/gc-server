// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import {replaceItems} from 'feathers-hooks-common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (_options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {

    const {app, result} = context;

    const authService = app.service('authentication');

    const response = await authService.create({
      strategy: 'server-email',
      email: result.email,
      code: '0000'
    });
  
    const authCodeService = app.service('otp');
    const authCode = await authCodeService._find({
      query: {
        type: 'email',
        dest: result.email,
        $sort: {
          createdAt: -1
        }
      },
      paginate: false
    });
  
    await Promise.all(authCode.map((each: { _id: any; }) => authCodeService._remove(each._id))) ;
  
    replaceItems(context, response);
  
    context.dispatch = response;
  
    return context;
  };
};
