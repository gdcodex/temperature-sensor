const express = require("express");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");

const {
  getTemperatures,
  createTemperature,
} = require("../controllers/sensorcontrollers");

//calling router method
const router = express.Router();

//checking if the user is authorized
router.use(auth);

//routes
router.get("/", getTemperatures);

router.post(
  "/",
  [
    check("temperature").notEmpty(),
    check("date").notEmpty(),
    check("sensor").notEmpty(),
  ],
  createTemperature
);

//exports
module.exports = router;
