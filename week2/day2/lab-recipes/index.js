const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    const recipes = await Recipe.insertMany(data);
    recipes.forEach((recipe) => console.log(recipe.title));
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    console.log("Update done");
    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Deleted cake");
    await mongoose.disconnect();
    /*     Recipe.create(data[0]).then((recipe) => {
      console.log(recipe.title);
    }); */
    /*     Recipe.insertMany(data).then((recipes) => {
      recipes.forEach((recipe) => {
        console.log(recipe.title);
      });

      Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      ).then(() => {
        console.log("recipe updated");
        Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
          console.log("Carrot Cake deleted");
          mongoose.disconnect().then(() => {
            console.log("disconnected");
          }); */
    /*           mongoose.connection.close().then(() => {
            console.log("Connection Closed");
          }); */
    //});
    //});
    //});

    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
