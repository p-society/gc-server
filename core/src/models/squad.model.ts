// squad-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { BranchEnumList } from '../constants/branch.enum';
import { SportEnumList } from '../constants/sport.enum';
import { Application } from '../declarations';
import mongoose, { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'squad';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
      enum: BranchEnumList,
      index: true,
    },
    sport: {
      type: String,
      required: true,
      enum: SportEnumList,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'platformSuperAdmin',
      required: true,
    },
    socials: [
      {
        type: String,
      }
    ],
    description: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
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
