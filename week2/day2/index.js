const express = require("express");
const PORT = 3000;
const hbs = require("hbs");
require("./database");
const City = require("./models/City");

const app = express();
app.use(express.static("public"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/city-list", async (req, res) => {
  const cities = await City.find();
  res.render("cities", { cities });
});

app.get("/new-city", async (req, res) => {
  const city = new City({ name: "Berlin", population: 2000 });
  await city.save();
  res.send(city);
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
