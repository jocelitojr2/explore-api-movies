const { Router } = require("express");

const usersRouter = require("./users.routes");
const moviesRouter = require("./movies.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movies", moviesRouter);

module.exports = routes;
