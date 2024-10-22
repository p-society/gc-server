

// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext) => {

    const { data } = context;
    const { email, otp } = data;
    if(!email || !otp){
      throw new BadRequest("Email or OTP not provided");
    }
    const otpService = context.app.service('otp')
    const otpEntry_Array = await otpService._find({
      query: { email, isConsumed: false },
      sort:{createdAt : -1},
    });
    const otp_entry = otpEntry_Array.data[0];
    if(!otp_entry || otp !== otp_entry.value){
      throw new BadRequest('Invalid OTP')
    }
    
    return context;
  };
};
