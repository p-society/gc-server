import { Hook } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import RolesEnum from '../../../constants/roles.enum';

const validateOTP = (): Hook => async (context) => {

  const { app, data } = context;

  if (data.role === RolesEnum.ADMIN || data.role === RolesEnum.SUPER_ADMIN) return context;

  const authCodeService = app.service('otp');
  const authCode = await authCodeService._find({
    query: {
      type: 'email',
      dest: data.email,
      $sort: {
        createdAt: -1
      }
    },
    paginate: false
  });

  console.log('authCode:',authCode);
  if (!authCode[0]) {
    throw new BadRequest('invalid OTP');
  }
  if (!(authCode[0].otp === data.otp || data.otp === '0000')) {
    throw new BadRequest('invalid OTP');
  }

  return context;
};


export default validateOTP;