import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { BadRequest } from '@feathersjs/errors';


enum Gender{
  'male','female'
}
enum Branch{
  'CSE', 'IT', 'CE','ETC','EEE'
}
enum Role{
  'USER', 'ADMIN', 'UMP', 'SUPER_ADMIN', 'ROOT_ADMIN'
}
interface Data {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  otp: string,
  dob: string,
  gender: Gender,
  batch: string,
  branch: Branch,
  role: Role,
}
export class Users extends Service {
  app: Application;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }


  async create(data: Data, params?: any): Promise<any>{
    const { email, firstName, lastName, password, dob, gender, batch, branch, role } = data;

    if(!email || !firstName || !lastName || !password || !dob || !gender || !batch || !branch){
      throw new BadRequest("Incomplete request payload")
    }
    
    const created_user = await super._create(data, params)

    return {
      ...created_user, password:undefined
    };
  }
}
