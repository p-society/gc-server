// player-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { number } from 'yargs';
import { BranchEnumList } from '../constants/branch.enum';
import RolesEnum, { RolesEnumList } from '../constants/roles.enum';
import { Application } from '../declarations';
import mongoose, { Model, Mongoose } from 'mongoose';
import { SportEnumList } from '../constants/sport.enum';

export default function (app: Application): Model<any> {
  const modelName = 'player';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { ObjectId } = mongoose.Schema.Types;
  const schema = new mongooseClient.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    sport: {
      type: String,
      required: true,
      enum: SportEnumList,
      index: true,
    },
    socials: [
      {
        type: Object
      }
    ],
    deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedBy: {
      type: ObjectId,
      ref: 'player'
    },
    deletedAt: {
      type: Date
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
