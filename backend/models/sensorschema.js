const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sensorSchema = new Schema({
  temperature: { type: Number, required: true },
  date:{type: Date,required: true},
  sensor: {type: String, required: true}, //e.g. sensor1, sensor2
});

module.exports = mongoose.model('Temperature',sensorSchema)
