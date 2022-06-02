const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  population: {
    type: Number,
    validate: {
      validator: (value) => {
        return value < 1000;
      },
      message: "Population should be less than 1000",
    },
  },
});

const City = mongoose.model("City", citySchema);

module.exports = City;
