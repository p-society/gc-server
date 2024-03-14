// match-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import MatchStatusEnum, { MatchStatusEnumList } from '../constants/match-status.enum';
import { Application } from '../declarations';
import mongoose, { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'match';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    team1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'team',
    },
    team2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'team',
    },
    squad1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'squad',
      required: true,
    },
    squad2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'squad',
      required: true,
    },
    assignedAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'admin',
      required: true,
    },
    venue: {
      type: String,
    },
    date: {
      type: Date,
    },
    status: {
      type: String,
      enum: MatchStatusEnumList,
      default: MatchStatusEnum.SCHEDULED,
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
