const express = require('express');
const { Movie } = require('../db');
const { Actor } = require('../db');

function list(req, res, next){
  Movie.findAll({
    include:['genre', 'director', 'actors']
  }).then(objects => res.json(objects));
}

function create(req, res, next){
  let movie = new Object();
  movie.title = req.body.title;
  movie.genreId =req.body.genreId;
  movie.directorId = req.body.directorId;

  Movie.create(movie)
  .then(movie => res.json(movie))
  .catch(err => res.status(500).json({error:err}));
}

function addActor(req, res, next){
  let id = req.body.id;
  let actorId = req.body.actorId;

  Movie.findByPk(id, {}).then((movie)=>{
    Actor.findByPk(actorId, {}).then((actor)=>{
      movie.addActor(actor);
      res.json(movie);
    });
  });
}


module.exports = {
  //list, index, create, update, destroy
  list, create, addActor
}
