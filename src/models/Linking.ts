import mongoose, { Schema, Document } from "mongoose";

export interface Reply extends Document {
  content: string;
  createdAt: Date;
}

const ReplySchema: Schema<Reply> = new mongoose.Schema({
  content: {
    type: String,
    required:true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
export interface Linking extends Document {
  username: string;
  message:string;
  reply:Reply[];
  createdAt:Date;
}

const LinkingSchema:Schema<Linking>=new mongoose.Schema({
   username:{
    type:String,
    required:true
   },
   message:{
    type:String,
    required:true
   },
   reply:[ReplySchema],
   createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

const LinkingModel =
  (mongoose.models.Linking as mongoose.Model<Linking>) ||
  mongoose.model<Linking>('Linking', LinkingSchema);

export default LinkingModel;