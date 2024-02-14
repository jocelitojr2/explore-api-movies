const { Router } = require("express");

const MoviesController = require("../controllers/MoviesController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const moviesRoutes = Router();

const moviesController = new MoviesController();

moviesRoutes.use(ensureAuthenticated);

moviesRoutes.post("/", moviesController.create);
moviesRoutes.get("/:id", moviesController.show);
moviesRoutes.delete("/:id", moviesController.delete);
moviesRoutes.put("/:movie_id/:user_id", moviesController.update);
moviesRoutes.get("/", moviesController.index);

module.exports = moviesRoutes;
