const express = require('express');
const router = express.Router();
const Movie = require("../models/Movie.model")

router.get('/', async(req, res, next) => {
    const movies = await Movie.find();
    res.render("movies/list", { movies })
});

router.get("/:id", async(req, res, next) => {
    const {id} = req.params;
    console.log(req.params)
    const movie = await Movie.findById(id);
    res.render("movies/details", { movie })
})

module.exports = router;
