const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blog");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// connect to Mongo
logger.info("connecting to", config.MONGO_URI, "\n");
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info("connected to", config.MONGO_URI);
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());

// using the middleware
app.use(middleware.requestLogger);

app.use("/", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// routing
console.log(1)


module.exports = app;