// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import RolesEnum, { RolesEnumList } from '../constants/roles-enum';
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');

  const schema = new mongooseClient.Schema(
    {
      email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim:true
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      dob: {
        type: Date,
      },
      gender: {
        type: String,
        enum: ['male', 'female','others'],
      },
      type: {
        type: String,
        enum: RolesEnumList,
        default: RolesEnum.USER,
      },
      isUmpire: {
        type: Boolean,
        default: false,
      },
      data: { // for form-fields
        type: Object
      }
    },
    {
      timestamps: true,
    }
  );

  // Avoid model compilation errors in watch mode
  // See: https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }

  return mongooseClient.model<any>(modelName, schema);
}
