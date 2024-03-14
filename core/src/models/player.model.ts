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
      default:RolesEnum.PLAYER
    },
    sport: {
      type: String,
      required: true,
      enum: SportEnumList,
      index: true,
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
