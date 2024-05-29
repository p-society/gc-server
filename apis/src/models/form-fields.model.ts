// form-fields-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';
import { FormFieldTypesList } from '../constants/form-field-types';

export default function (app: Application): Model<any> {
  const modelName = 'formFields';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = Schema.Types;
  const schema = new Schema({
    organization: {
      type: ObjectId,
      ref: 'organization',
      required: true
    },
    createdBy: {
      type: ObjectId,
      required: true,
      ref: 'users',
    },
    fieldType: {
      type: String,
      default: 'custom',
      enum: ['custom', 'system'],
    },
    key: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    module: {
      type: String,
      default: 'user',
      enum: ['user', 'vendor'],
    },
    section: {
      type: ObjectId,
      ref: 'formFieldSections',
      required: true,
      index: true,
    },
    // entityType: {
    //   type: String,
    //   enum: ['record-types'],
    // },
    // entityId: {
    //   type: ObjectId,
    //   refPath: 'entityType',
    // },
    type: {
      type: String,
      required: true,
      enum: FormFieldTypesList,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    helpText: {
      type: String,
      trim: true,
    },
    placeholder: {
      type: String,
      trim: true,
    },
    required: {
      type: Boolean,
      default: false,
      index: true,
    },
    options: [
      {
        value: {
          type: String,
          required: true,
          trim: true,
        },
        label: {
          type: String,
          trim: true,
        },
        default: {
          type: Boolean,
          default: false,
        },
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
    unique: {
      type: Boolean,
    },
    isSearchable: {
      type: Boolean,
    },
    isSortable: {
      type: Boolean,
    },
    deleted: {
      type: Boolean,
      index: true,
    },
    deletedBy: {
      type: ObjectId,
      ref: 'users',
    },
    deletedAt: {
      type: Date
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