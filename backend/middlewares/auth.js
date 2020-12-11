const httpError = require("../models/errors");
module.exports = (req, res, next) => {
  let token;
  try {
    token = req.headers.authorization.split(" ")[1]; //authorization -> bearer token
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken = ["kwyo07m02ndy3nx9nayzo11q"].includes(token); 
    //dummy array which will actually contain all the authorized tokens 
    if (!decodedToken) {
      throw new Error("Authentication failed");
    }
    next();
  } catch (err) {
    return next(new httpError("Authentication failed", 403));
  }
};
