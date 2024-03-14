// team-player-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import mongoose, { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'teamPlayer';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    team:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'team',
      required:true,
    },
    squad:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'squad',
      required:true,
    },
    position:{
      type:String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
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
