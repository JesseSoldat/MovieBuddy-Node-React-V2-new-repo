const Movie = require("../models/movie");
const isAuth = require("../middlewares/isAuth");

module.exports = app => {
  app.get("/api/favorites/movies", isAuth, async (req, res) => {
    const {
      user: { _id }
    } = req;

    try {
      const movies = await Movie.find({ user: _id }).sort([["_id", -1]]);
      res.status(200).send(movies);
    } catch (err) {
      res.status(400).send("Could get your favorites");
    }
  });

  app.post("/api/favorites/movies", isAuth, async (req, res) => {
    const {
      user: { _id }
    } = req;

    try {
      const movie = new Movie({ ...req.body, user: _id });
      await movie.save();
      res.status(200).send(movie);
    } catch (err) {
      console.log("post favorites", err);

      res.status(400).send("Could not save the movie to favorites");
    }
  });

  app.delete("/api/favorites/movies/:id", isAuth, async (req, res) => {
    const { id } = req.params;
    try {
      await Movie.findByIdAndRemove(id);
      res.status(200).send(id);
    } catch (err) {
      res.status(400).send("Could not delete the movie from favorites");
    }
  });
};
