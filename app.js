const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const compression = require("compression");
const helmet = require("helmet");

const indexRouter = require("./routes/index");
const fileRouter = require("./routes/family");
const travelRouter = require("./routes/travel");
const kitchenRouter = require("./routes/kitchen");
const bookmarksRouter = require("./routes/bookmark");

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
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://example.com", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
      imgSrc: ["'self'", "https://vanessamarcus.s3.us-east-2.amazonaws.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://third-party-css.com", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "data:", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      // Add other directives as needed
    },
  },
}));

app.use(compression()); // Compress all routes
app.use(logger("dev"));

// Apply body-parser middleware to the app instance
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.use("/", indexRouter);
app.use("/file", fileRouter);
app.use("/kitchen", kitchenRouter);
app.use("/travel", travelRouter);
app.use("/recipes", bookmarksRouter);

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