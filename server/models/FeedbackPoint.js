import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // Prevents automatic _id generation for each message
);

const feedbackPointSchema = new Schema(
  {
    mockupId: {
      type: Schema.Types.ObjectId,
      ref: "Mockup",
      required: true,
      index: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    addedBy: {
      id: {
        type: String,
        required: true,
        trim: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
    status: {
      type: String,
      enum: ["open", "resolved"],
      default: "open",
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

export const FeedbackPoint = mongoose.model(
  "FeedbackPoint",
  feedbackPointSchema
);
