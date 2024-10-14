/* eslint-disable @typescript-eslint/no-unused-vars */
import { Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { BadRequest } from '@feathersjs/errors';

interface Data {
  email: string;
}

interface ServiceOptions { }


export class SendOtp implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  private generate_otp(): string {
    const set = '0123456789';
    let otp = '';

    for (let i = 0; i < 6; i++) {

      otp += set[Math.floor(Math.random() * set.length)]
    }

    return otp;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Data, params?: any): Promise<{ message: string }> {
    const otpservice = this.app.service('otp');
    const { email } = data;
    const otp_value = this.generate_otp();
    params.otp_value= otp_value;
    params.email = email;
    try {
      await otpservice._create({
        email: email,
        value: otp_value,
        createdAt: Date.now()
      })
      return { message: `otp sent successfully to ${email}` }
    } catch (error) {
      return { message: `Error occured` }
    }
  }
}