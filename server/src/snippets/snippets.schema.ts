import * as mongoose from 'mongoose';

export const SnippetSchema = new mongoose.Schema({
  title: String,
  code: String,
  language: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

SnippetSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});
