const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/library")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error(err);
  });
