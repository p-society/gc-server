// management/matches-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'matches';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = Schema.Types;
  const schema = new Schema({
    team1: {
      type: ObjectId,
      ref: 'teams',
      required: true,
    },
    team2: {
      type: ObjectId,
      ref: 'teams',
      required: true,
    },
    squad1: {
      type: ObjectId,
      ref: 'squads',
      required: true,
    },
    squad2: {
      type: ObjectId,
      ref: 'squads',
      required: true,
    },
    date: {
      type: Date
    },
    location: {
      type: String
    },
    status: {
      type: String
    },
    result: {
      type: String
    },
    assignedAdmin: {
      type: ObjectId,
      ref: 'users'
    },
    // adminExpiry: {

    // },
    deleted: {
      type: Boolean
    },
    deletedAt: {
      type: Date
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
