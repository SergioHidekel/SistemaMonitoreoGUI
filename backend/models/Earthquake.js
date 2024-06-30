// backend/models/Earthquake.js
import mongoose from 'mongoose';

const earthquakeSchema = new mongoose.Schema({
  mag: Number,
  place: String,
  time: Date,
  latitude: Number,
  longitude: Number,
});

export default earthquakeSchema;
