import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import auth from '../../hooks/auth';

interface Data {
  strategy : string,
  email : string,
  password : string,
}

interface ServiceOptions {}

export class Auth implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find (): Promise<any> {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get (): Promise<any> {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create (data : Data, params : any): Promise<any> {

    return {}
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update () : Promise<any>{
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch (): Promise<any> {
    
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove () : Promise<any>{
    
  }
}
