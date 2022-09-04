import mongoose, { Schema } from "mongoose";

// Database Schema
const NodeSchema = new Schema({
  _id: String,
  title: { type: String, required: true },
  shape: { type: String, required: true },
  bgColor: { type: String, required: true },
  txColor: { type: String, required: true },
  child: [{}],
  Parent_id: { type: String, required: false },
});

export const NodeModel = mongoose.model("NodeModel", NodeSchema);
