// squad-player-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import mongoose, { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'squadPlayer';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'player',
      required: true,
    },
    squad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'squad',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'platformSuperAdmin',
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    description: {
      type: String,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'platformSuperAdmin'
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
