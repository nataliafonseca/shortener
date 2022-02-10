import mongoose from "mongoose";

const ShortenerSchema = mongoose.Schema(
  {
    link: { type: String, required: true },
    hash: { type: String, required: true },
    hits: { type: Number, default: 0 },
    metadata: [mongoose.Schema.Types.Mixed],
    expired: { type: Boolean, default: false },
    expiredDate: Date,
    name: String,
  },
  {
    timestamp: true,
  }
);

export const ShortenerModel = mongoose.model("shortener", ShortenerSchema);
