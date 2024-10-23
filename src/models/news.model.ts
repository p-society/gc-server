// news-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { required } from 'feathers-hooks-common';
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'news';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    headline:{
      type: String,
      required:true,
    },
    title:{
      type:String,
      required:true,
    },
    contentText:{
      type:String,
      required:true,
    },
    author:{
      type: mongooseClient.Schema.Types.ObjectId,
      ref:"users",
      required:true
    },
    date:{
      type:Date,
      required:true,
    },
    photos:{
      type:[String]
    },
    tags:{
      type:[String]
    },
    likes:{
      type: [mongooseClient.Schema.Types.ObjectId],
      ref:"users"
    },
    comments:{
      type: [mongooseClient.Schema.Types.ObjectId],
      ref:"users"
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
