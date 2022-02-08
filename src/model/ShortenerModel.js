import mongoose from "mongoose";

const ShortenerSchema = mongoose.Schema({
  name: String,
});

export const ShortenerModel = mongoose.model("shortener", ShortenerSchema);
