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
  const cities = await City.find({}, { _id: 0 }, { sort: { name: 1 } });
  res.render("cities", { cities });
});

app.get("/city", async (req, res) => {
  const city = await City.findByIdAndUpdate("6298fcaf579506883c829d25", {
    $set: { name: "Barcelona" },
  });
  res.send(city);
});

app.get("/bye", async (req, res) => {
  await City.findByIdAndRemove("6298fcaf579506883c829d25");
  res.send("ok");
});

app.get("/count", async (req, res) => {
  const count = await City.countDocuments();
  res.send(count.toString());
});

app.get("/new-city", async (req, res) => {
  const city = await City.create([
    { name: "Copenhagen", population: 100000 },
    { name: "Stockholm", population: 70000 },
  ]);
  res.send(city);
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
