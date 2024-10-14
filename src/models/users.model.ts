// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { required } from 'feathers-hooks-common';
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({

    email: { type: String, unique: true, lowercase: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    dob:{
      type:String,
    },
    gender: {
      type: String,
      enum: ['male', 'female']
    },
    batch: {
      type: Number,
      required: true,
    },
    branch: {
      type: String,
      enum: ['CSE', 'IT', 'ETC', 'EEE', 'ETC'],
      required: true,
    },
    role: {
      type: String,
      enum: ['USER','ADMIN','UMP','SUPER_ADMIN','ROOT_ADMIN'],
      default: "USER"
    }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
