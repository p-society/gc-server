import { Id, NullableId, Paginated, Params, ServiceAddons, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { extractTokenFromHeader } from '../../../utils/extractTokenFromHeader';
import { BadRequest } from '@feathersjs/errors';
import { Service } from 'feathers-mongoose';
import { Users } from '../users.class';

interface Data { }

interface ServiceOptions { }

export class Verification implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<Data> {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Data, params?: Params): Promise<Data> {
    try {
      // @ts-ignore
      if (!data?.otp) throw new BadRequest('OTP not provided');
      if (!params) throw new Error('Params not found at verification/create');

      const token: string | null = extractTokenFromHeader(params);

      if (!token) throw new BadRequest('Authentication Token Empty');
      const secret = this.app.settings.authentication.secret;

      // @ts-ignore
      const { player, otp } = jwt.decode(token, secret);
      console.log('player = ', player);
      if (!player) throw new BadRequest('Invalid Token');

      // @ts-ignore
      if (otp === data.otp) {
        const UserService: Users & ServiceAddons<any> = this.app.service('users');
        console.log(player);
        const user = await UserService._create(player);
        return user
      }
      else throw new Error('OTP is invalid');
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<Data> {
    return { id };
  }
}
