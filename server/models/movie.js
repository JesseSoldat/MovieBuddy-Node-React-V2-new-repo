const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  movieid: {
    type: Number,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true
  },
  poster_path: {
    type: String
  }
});

const Movie = mongoose.model("movie", MovieSchema);
module.exports = Movie;
