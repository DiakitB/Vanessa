const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const testing = require("./scripts/compute");
const indexRouter = require("./routes/index");
const fileRouter = require("./routes/family");
const travelRouter = require("./routes/travel"); // Import the travel router
const bookmaksRouter = require("./routes/bookmark");
const flash = require("express-flash");
const session = require("express-session");
const compression = require("compression");
const helmet = require("helmet");
// Compare this snippet from routes/kitchen.js:
const kitchenRouter = require("./routes/kitchen"); // Import the kitchen router

const app = express();

// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Setup session middleware

app.use(session({

  secret: 'your_secret_key',

  resave: false,

  saveUninitialized: true

}));



// Setup flash middleware

app.use(flash());
app.use(helmet());

app.use(compression()); // Compress all routes
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



app.use("/", indexRouter);
app.use("/file", fileRouter);
app.use("/kitchen", kitchenRouter); // Use the kitchen router for requests to the /kitchen path
app.use("/travel", travelRouter); // Use the travel router for requests to the /travel path
app.use("/recipes", bookmaksRouter);
app.locals.testing = testing.testing;



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;









