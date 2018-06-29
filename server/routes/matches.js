const Movie = require("../models/movie");
const isAuth = require("../middlewares/isAuth");
const hasOwnProp = require("../utils/hasOwnProp");

module.exports = app => {
  app.get("/api/matches/movies", isAuth, async (req, res) => {
    const {
      user: { _id }
    } = req;

    try {
      const [userMovies, othersMovies] = await Promise.all([
        Movie.find({ user: _id }),
        Movie.find({ user: { $ne: _id } }).populate("user", "username")
      ]);

      const userMoviesIds = userMovies.map(movie => movie.movieid);

      let users = {};

      othersMovies.forEach(movie => {
        const { user, movieid } = movie;
        const { _id } = user;

        if (hasOwnProp(users, _id)) {
          if (userMoviesIds.includes(movieid)) {
            return;
          }
          users[_id]["unmatched"].push(movie);
        } else {
          if (userMoviesIds.includes(movieid)) {
            return;
          }
          users[_id] = { unmatched: [movie], matched: 0 };
        }
      });

      othersMovies.forEach(movie => {
        const { user, movieid } = movie;
        const { _id } = user;

        if (hasOwnProp(users, _id)) {
          if (userMoviesIds.includes(movieid)) {
            users[_id]["matched"] = users[_id].matched + 1;
          }
        } else {
          if (userMoviesIds.includes(movieid)) {
            users[_id]["matched"] = 1;
          }
        }
      });

      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
