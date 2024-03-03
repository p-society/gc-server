import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import * as jwt from 'jsonwebtoken';
import app from '../../app';
import sendMail from '../../utils/sendMail';
import generateOTP from '../../utils/generateOTP';
import RolesEnum from '../../constants/roles.enum';

export class Player extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
  async create(data: any, params: Params) {

    try {
      if (!data.email || !data.password) throw new BadRequest('Email and Password is required');
      const otp = generateOTP();
      const secret = app.settings.authentication.secret;
      data.role = RolesEnum.PLAYER;
      const token = jwt.sign({
        player: data,
        otp
      }, secret);

      await sendMail(data.email, otp);

      return { token };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
