const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const moviesPath = path.join(__dirname, "movies.json");

const updateMovies = async (movies) =>
  await fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));

const getAllMovies = async () => {
  const movies = await fs.readFile(moviesPath, "utf-8");
  return JSON.parse(movies);
};

const getMovieById = async (id) => {
  const movies = await getAllMovies();
  const result = movies.find((movie) => movie.id === id);
  return result || null;
};

const addMovie = async (data) => {
  const movies = await getAllMovies();
  const newMovie = {
    id: nanoid(),
    ...data,
  };
  movies.push(newMovie);

  updateMovies(movies);

  return newMovie;
};

const updateMovie = async (id, data) => {
  const movies = await getAllMovies();
  const index = movies.findIndex((movie) => movie.id === id);
  if (index === -1) {
    return null;
  }
  movies[index] = { id, ...data };

  updateMovies(movies);

  return movies[index];
};

const deleteMovieById = async (id) => {
  const movies = await getAllMovies();
  const index = movies.findIndex((movie) => movie.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = movies.splice(index, 1);
  updateMovies(movies);
  return result;
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovieById,
};
