/* eslint-disable @typescript-eslint/no-unused-vars */
import { Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';
// import axios from 'axios';
// import {PublishCommand, SNSClient} from '@aws-sdk/client-sns';

interface Data {
  email: string;
}

interface ServiceOptions { }

function generateOTP() {
  const digits = '0123456789';
  let OTP = '';

  for (let i = 0; i < 4; i++) {
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
  async create(data: Data, params?: Params): Promise<{ message: string, isNewUser: boolean }> {
    const otpService = this.app.service('otp');
    const userService = this.app.service('users');

    const otp = generateOTP();

    await otpService._create({
      type: 'email',
      dest: data.email,
      otp
    });

    const [user] = await userService._find({
      query: {
        email: data.email
      },
      paginate: false
    });

    return {
      message: 'OTP Send Successfully',
      isNewUser: !Boolean(user),
    };
  }
}
