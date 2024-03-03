// platform-super-admin-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import RolesEnum, { RolesEnumList } from '../constants/roles.enum';
import { Application } from '../declarations';
import mongoose, { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'platformSuperAdmin';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
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
      type: String,
      required: true,
      enum: RolesEnumList,
      default: RolesEnum.PLATFORM_SUPER_ADMIN
    },
    contactNo: {
      type: String
    },
    socials: [
      {
        type: Object
      }
    ],
    // deleted: {
    //   type: Boolean,
    //   default: false,
    //   index: true,
    // },
    // deletedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    // },
    // deletedAt: {
    //   type: Date
    // },
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
