const { response } = require("express");
const knex = require("../database/knex");

class MoviesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const user_id = request.user.id;

    const [note_id] = await knex("movies").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("tags").insert(tagsInsert);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("movies").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const userInfo = await knex("users").select("name", "avatar").where({ id: note.user_id}).first();

    return response.json({
      ...note,
      userInfo,
      tags,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("movies").where({ id }).delete();

    return response.json();
  }

  async update(request, response) {
    const { id, user_id } = request.params;
    const { title, description, rating } = request.body;


    const movie = await knex("movies").where({id}).first();
    const movieRating = await knex("tags").where({note_id: id});

    return response.json({movie,movieRating}, 201);
  }

  async index(request, response) {
    const { title, tags } = request.query;

    const user_id = request.user.id;

    let movies;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      movies = await knex("tags")
        .select(["movies.id", "movies.title", "movies.user_id"])
        .where("movies.user_id", user_id)
        .whereLike("movies.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movies", "movies.id", "tags.note_id")
        .groupBy("movies.id")
        .orderBy("movies.title");
    } else {
      movies = await knex("movies")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    return response.json(movies);
  } 
}

module.exports = MoviesController;
