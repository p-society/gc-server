// admin-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { boolean } from 'yargs';
import RolesEnum, { RolesEnumList } from '../constants/roles.enum';
import { Application } from '../declarations';
import mongoose, { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'admin';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'player'
    },
    // TODO isPlayer (Needed?) , expiry ??
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
