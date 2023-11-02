const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/user");
const blogRouter = require("./controllers/blog");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// connect to Mongo
logger.info("connecting to", config.MONGO_URI, "\n");

  
const connectMongo = async() => {
  await mongoose.connect(config.MONGO_URI)
  logger.info(2)
  logger.info("connected to", config.MONGO_URI);
}
connectMongo();

app.use(cors());
app.use(express.json());

// using the middleware
app.use(middleware.requestLogger);

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
// app.use(middleware.errorHandler);

// routing
console.log(1)


module.exports = app;