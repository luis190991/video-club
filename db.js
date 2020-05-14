const Sequelize = require('sequelize');

const directorModel = require('./models/director');
const actorModel = require('./models/actor');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const movieActorsModel = require('./models/moviesactors');

//                              Nombre de la bd, user, password, conf obj
const sequelize = new Sequelize('test', 'root', 'secret', {
  host:'localhost',
  dialect:'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const MoviesActors = movieActorsModel(sequelize, Sequelize);

//Un genero puede tener muchas películas.
Genre.hasMany(Movie, {as:'movies'});
//Una pelicula puede tener un genero
Movie.belongsTo(Genre, {as: 'genre'});

Director.hasMany(Movie, {as:'movies'});
Movie.belongsTo(Director, {as:'director'});

MoviesActors.belongsTo(Movie, {foreignKey:'movieId'});
MoviesActors.belongsTo(Actor, {foreignKey:'actorId'});

Movie.belongsToMany(Actor, {
  through: 'moviesActors',
  foreignKey: 'actorId',
  as: 'actors'
});

Actor.belongsToMany(Movie, {
  through: 'moviesActors',
  foreignKey: 'movieId',
  as: 'movies'
});

sequelize.sync({
  force:true
}).then(()=>{
  console.log("Db create");
});

/*sequelize.authenticate().then(()=>{
  console.log("Conexión ok");
}).catch(err => {
  console.log('no existe conexión');
});*/

module.exports = {
  Director, Actor, Genre, Movie
};
