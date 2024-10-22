import { Application } from '../declarations';

export type isVerified = boolean;
export default async (
  app: Application,
  phone: string,
  OTP: string
): Promise<isVerified> => {
  const authCodeService = app.service('otp');
  // @ts-ignore
  const resp: Array<{
    type: string;
    dest: string;
    otp: string;
  }> = await authCodeService._find({
    query: {
      dest: phone,
    },
    paginate: false,
  });

  if (resp[0].otp !== OTP) return false;
  return true;
};
