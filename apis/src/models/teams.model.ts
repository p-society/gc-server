// management/teams-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'teams';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = Schema.Types;
  const schema = new Schema({
    squad: {
      type: ObjectId,
      ref: 'squads',
      required: true,
    },
    game: {
      type: String,
      required: true,
    },
    createdBy: {
      type: ObjectId,
      ref: 'users',
    },
    deleted: {
      type: Boolean
    },
    deletedAt: {
      type:Date
    },
    deleteBy: {
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
