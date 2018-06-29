const Movie = require("../models/movie");
const isAuth = require("../middlewares/isAuth");

module.exports = app => {
  app.get("/api/matches/movies", isAuth, async (req, res) => {
    const {
      user: { _id }
    } = req;

    try {
      const [userMovies, othersMovies] = await Promise.all([
        Movie.find({ user: _id }),
        Movie.find({ user: { $ne: _id } })
      ]);

      const userMoviesIds = userMovies.map(movie => movie.movieid);
      console.log(userMoviesIds);

      const filteredOtherMovies = othersMovies.filter(
        movie => !userMoviesIds.includes(movie.movieid)
      );

      res.status(200).send(filteredOtherMovies);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
