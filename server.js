if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const indexRoute = require('./routes/index')
const mongoSanitize = require('express-mongo-sanitize');
const PORT = process.env.PORT || 3030;
const dbUrl = process.env.DB_URL
//"mongodb://localhost:27017/UrlShrinker";

//Mongo DB connection
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection Open");
  })
  .catch((err) => {
    console.log("Oh no error!!!!");
    console.log(err);
  });

//Setting up Views Engine
app.set("view engine", "EJS");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize({
  replaceWith: '_'
}))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


//Express Router
app.use('/', indexRoute)


//Fire up Express Server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
