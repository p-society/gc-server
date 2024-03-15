// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { BranchEnumList } from '../constants/branch.enum';
import RolesEnum, { RolesEnumList } from '../constants/roles.enum';
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: Number,
      enum: RolesEnumList,
    },
    branch: {
      type: String,
      required: true,
      enum: BranchEnumList,
      index: true,
    },
    year: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
      index: true,
    },
    contactNo: {
      type: String
    },
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
