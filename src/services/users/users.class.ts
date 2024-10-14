import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { BadRequest } from '@feathersjs/errors';


interface Data {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  otp: string,
  dob: string,
  gender: ['male' | 'female'],
  batch: string,
  branch: ['CSE', 'IT', 'ETC', 'EEE', 'ETC'],
  role: ['USER', 'ADMIN', 'UMP', 'SUPER_ADMIN', 'ROOT_ADMIN'],
}
export class Users extends Service {
  app: Application;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }


  async create(data: Data, params?: any): Promise<any>{
    const { email, firstName, lastName, password, otp, dob, gender, batch, branch, role } = data;

    const existingUser = await this.find({
      query: { email },
      paginate: false
    });

    if (Array.isArray(existingUser) && existingUser.length > 0) throw new BadRequest("User with this email already exists") 
    const created_User = await this._create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      dob: dob,
      gender: gender,
      batch: batch,
      branch: branch
    })

    return {
      ...created_User, password:undefined
    };
  }
}
