const moviesService = require("./movies");
const { program } = require("commander");

program
  .option("-a --action <type>")
  .option("-id --id <type>")
  .option("-d --director <type>")
  .option("-t --title <type>");

program.parse();
const options = program.opts();

const invokeAction = async ({ action, id, title, director }) => {
  switch (action) {
    case "list":
      const allMovies = await moviesService.getAllMovies();
      return console.log(allMovies);

    case "getMovieById":
      const movie = await moviesService.getMovieById(id);
      return console.log(movie);

    case "addMovie":
      const newMovie = await moviesService.addMovie({ title, director });
      return console.log(newMovie);

    case "updateMovieById":
      const updateMovie = await moviesService.updateMovie(id, {
        title,
        director,
      });
      return console.log(updateMovie);

    case "deleteMovie":
      const deleteMovie = await moviesService.deleteMovieById(id);
      return console.log(deleteMovie);

    default:
      console.log("Unknown action");
  }
};
// invokeAction({ action: "list" });
// invokeAction({ action: "getMovieById", id: "B9Jvaz8WxZ" });
// invokeAction({
//   action: "addMovie",
//   title: "Lord Of The Rings",
//   director: "Peter Robert Jackson",
// });
// invokeAction({
//   action: "updateMovieById",
//   id: "viu0ZDHKCziiANYM7N750",
//   title: "Lord Of The Rings",
//   director: "Peter Robert Jackson",
// });
// invokeAction({ action: "deleteMovie", id: "V5goLp6JzS" });
invokeAction(options);
