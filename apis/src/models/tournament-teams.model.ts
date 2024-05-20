// tournament-teams-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'tournamentTeams';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = Schema.Types;
  const schema = new Schema({
    tournament: {
      type: ObjectId,
      ref: 'tournaments',
      required: true,
    },
    team: {
      type: ObjectId,
      ref: 'teams',
      required: true,
    },
    group: {
      type: String,
    },
    seed: {
      type: Number,
    },
    points: {
      type: Number,
    },
    matchesPlayed: {
      type: Number,
    },
    wins: {
      type: Number,
    },
    losses: {
      type: Number,
    },
    draws: {
      type: Number,
    },
    scoreFor: { // goals scored, points scored, etc.
      type: Number,
    },
    scoreAgainst: { // goals conceded, points conceded, etc.
      type: Number,
    },
    scoreDifference: { // goal difference, point difference, etc.
      type: Number,
    },
    status: {
      type: String,
      enum: ['active', 'eliminated', 'completed'],
      default: 'active',
    },
    performanceData: {
      type: Object,
    },
    additionalData: {
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
