// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { query } from '@feathersjs/express';
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const {data} = context;
    const {email}  = data;
    const otpService = context.app.service('otp');
    const otpEntry_Array = await otpService._find({
      query:{
        email: email, isConsumed:false,
      },
      sort:{createdAt : -1}
    })
    
    const otpEntryId = otpEntry_Array.data[0]._id
    await otpService.patch(otpEntryId, { isConsumed: true });
    return context;
  };
};
