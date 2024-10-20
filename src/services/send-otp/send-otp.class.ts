import { Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { BadRequest } from '@feathersjs/errors';
import Mailer from '../../utils/mailer';
interface Data {
  email: string;
}

interface ServiceOptions {}

function generateOTP() {
  const digits = '0123456789';
  let OTP = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    OTP += digits[randomIndex];
  }

  return OTP;
}

export class SendOtp implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(
    data: Data,
    params?: Params
  ): Promise<{ message: string; isNewUser: boolean }> {
    if (!data.email) {
      throw new BadRequest('Email not provided');
    }

    try {
      const OTP = generateOTP();
      const otpService = this.app.service('otp');
      const mailer = new Mailer();

      const tasks: Promise<any>[] = [
        otpService._create({
          type: 'email',
          dest: data.email,
          otp: OTP,
        }),
        mailer.fanOutMail(
          [data.email],
          'OTP Verification for GC Mobile App',
          'test',
          'test-ptxt' 
        ),
        this.app.service('users')._find({
          query: { email: data.email },
          paginate: false,
        }),
      ];

      const [_, __, [user]] = await Promise.all(tasks);

      return {
        message: 'OTP sent successfully',
        isNewUser: !Boolean(user),
      };
    } catch (error: any) {
      throw new Error(`Failed to send OTP: ${error.message}`);
    }
  }
}
