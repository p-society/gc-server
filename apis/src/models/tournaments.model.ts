// tournaments-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import GamesListEnums from '../constants/games.enums';
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'tournaments';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = Schema.Types;
  const schema = new Schema({
    name: {
      type: String,
      required: true,
    },
    game: {
      type: String,
      enum: GamesListEnums,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
    },
    createdBy: {
      type: ObjectId,
      ref: 'users',
    },
    data: {
      type: Object,
    },
    deleted: {
      type: Boolean,
    },
    deletedAt: {
      type: Date,
    },
    deletedBy: {
      type: ObjectId,
      ref: 'users',
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
