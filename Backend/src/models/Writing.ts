import mongoose, { Schema, Document } from "mongoose";

export interface IWriting extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const writingSchema = new Schema<IWriting>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IWriting>("Writing", writingSchema);
