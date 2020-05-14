const express = require('express');
const { Director } = require('../db');

// todos los elementos GET / => list
function list(req, res, next) {
  Director.findAll({}).then(objects => res.json(objects));
}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  const id = req.params.id;
  Director.findByPk(id, {}).then(object => res.json(object));
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  let director = new Object();
  director.name = req.body.name;
  director.last_name = req.body.last_name;
  Director.create(director)
  .then(director => res.json(director))
}

// modifica un elemento PUT /:id => update
function update(req, res, next) {
  const id = req.params.id;
  Director.findByPk(id, {}).then((object)=>{
    object.name = req.body.name ? req.body.name : object.name;
    object.last_name = req.body.last_name ?
     req.body.last_name : object.last_name;
    object.update({'name':object.name, 'last_name':object.last_name})
    .then(object => res.json(object));
  });
}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {
  const id = req.params.id;
  Director.destroy({where:{id:id}}).then(object => res.json(object));
}

module.exports = {
  list, index, create, update, destroy
}
