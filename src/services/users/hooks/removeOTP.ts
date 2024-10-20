import { Hook } from '@feathersjs/feathers';
import { replaceItems } from 'feathers-hooks-common';

const removeOTP = (): Hook => async (context) => {
  const { app, result } = context;

  const authService = app.service('authentication');
  const response = await authService.create({
    strategy: 'server-email',
    email: result.email,
    code: '000000',
  });

  const authCodeService = app.service('otp');
  const authCode = await authCodeService._find({
    query: {
      type: 'email',
      dest: result.email,
      $sort: {
        createdAt: -1,
      },
    },
    paginate: false,
  });

  await Promise.all(
    authCode.map((each: { _id: any }) => authCodeService._remove(each._id))
  );

  replaceItems(context, response);

  context.dispatch = response;

  return context;
};

export default removeOTP;
