const express = require('express');
const { Genre } = require('../db');

// todos los elementos GET / => list
function list(req, res, next) {
  Genre.findAll({}).then(objects => res.json(objects));
}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  const id = req.params.id;
  Genre.findByPk(id, {}).then(object => res.json(object));
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  let genre = new Object();
  genre.description = req.body.description;
  genre.status = req.body.status;
  Genre.create(genre).then(genre => res.json(genre));
}

// modifica un elemento PUT /:id => update
function update(req, res, next) {
  const id = req.params.id;
  Genre.findByPk(id, {}).then((object)=>{
    object.description = req.body.description ?
      req.body.description : object.description;
    object.status = req.body.status ? req.body.status : object.status;
    object.update({'description':object.description, 'status':object.status})
    .then(object => res.json(object));
  });
}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {
  const id = req.params.id;
  Genere.destroy({where:{id:id}}).then(object => res.json(object));
}

module.exports = {
  list, index, create, update, destroy
}
