const httpError = require("../models/errors");
const { validationResult } = require("express-validator");
const Temperature = require("../models/sensorschema");

//getting temperatures
const getTemperatures = async (req, res, next) => {
  console.log(req.query.sensor);
  let temperature;
  try {
    // temperature = await Temperature.find({ date: { $gte: from, $lte: to },sensor});
    temperature = await Temperature.find({
      date: { $gte: req.query.from, $lte: req.query.to },
      sensor: req.query.sensor,
    }).sort("date");
  } catch (error) {
    console.log(error);
    return next(new httpError("Something went wrong", 500));
  }
  if (!temperature) {
    return next(
      new httpError(
        "Couldn't find any temperatures between the given range",
        404
      )
    );
  }
  res.json({ temperature });
};

//add data
const createTemperature = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new httpError("Please provide all necessary details", 422));
  }

  const { temperature, date, sensor } = req.body;
  const newTemperature = new Temperature({
    temperature,
    date,
    sensor,
  });
  try {
    await newTemperature.save();
  } catch (error) {
    console.log(error);
    return next(
      new httpError("Couldn't save temperature to the database", 500)
    );
  }

  res.status(201).json({ temperature: newTemperature });
};
//exports
module.exports = {
  getTemperatures,
  createTemperature,
};
