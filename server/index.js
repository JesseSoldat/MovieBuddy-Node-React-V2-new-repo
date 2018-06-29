require("dotenv").config({ path: "../.env.dev" });
const express = require("express");

const { mongoose } = require("./db/mongoose");
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

require("./routes/user")(app);
require("./routes/favorites")(app);
require("./routes/matches")(app);

app.get("*", (req, res) => {
  res.send(`My Server is up on port: ${PORT}`);
});

app.listen(PORT);
