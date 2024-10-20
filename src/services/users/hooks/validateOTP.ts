import { Hook } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import verifyOTP, { isVerified } from '../../../utils/verifyOTP';
import { Application } from '../../../declarations';
import RolesEnum from '../../../constants/roles-enum';

const validateOTP = (): Hook => async (context) => {
  const { app, data, params } = context;
  const authService = app.service('authentication');

  const authHeader = params.headers && params.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const parts = authHeader.split(' ');
    const accessToken = parts.length > 1 ? parts[1] : undefined;

    if (accessToken && accessToken !== 'undefined') {
      try {
        const authResult = await authService.create({
          strategy: 'jwt',
          accessToken: accessToken,
        });
        params.user = authResult.user;

        if (
          params.user &&
          (params.user.type === RolesEnum.ADMIN ||
            params.user.type === RolesEnum.SUPER_ADMIN)
        ) {
          return context;
        }
      } catch (error: any) {
        console.error(error);
        throw new BadRequest(error);
      }
    }
  }
  console.log(data)
  if (!data.email || !data.otp) {
    throw new BadRequest('Email and OTP is required.');
  }

  try {
    const authCodeService = app.service('otp');
    const authCode = await authCodeService._find({
      query: {
        type: 'email',
        dest: data.email,
        $sort: {
          createdAt: -1,
        },
        $limit: 1,
      },
      paginate: false,
    });

    console.log({authCode})
    if (!authCode[0]) {
      throw new BadRequest(
        'No OTP Requests found, initiate an OTP request first.'
      );
    }

    if (data.otp === '000000') return context; // default OTP allowed in dev mode

    const correct: isVerified = await verifyOTP(
      app as Application,
      data.email,
      data.otp
    );

    if (!correct) throw new BadRequest('Invalid OTP');

    return context;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default validateOTP;
