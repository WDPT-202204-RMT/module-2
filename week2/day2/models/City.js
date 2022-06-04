const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  population: {
    type: Number,
  },
});

const City = mongoose.model("City", citySchema);

module.exports = City;
