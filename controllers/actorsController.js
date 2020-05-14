const express = require('express');
const { Actor } = require('../db');

// todos los elementos GET / => list
function list(req, res, next) {
  Actor.findAll({}).then(objects => res.json(objects));
}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  const id = req.params.id;
  Actor.findByPk(id, {}).then(object => res.json(object));
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  let actor = new Object();
  actor.name = req.body.name;
  actor.last_name = req.body.last_name;
  Actor.create(actor)
  .then(actor => res.json(actor))
}

// modifica un elemento PUT /:id => update
function update(req, res, next) {
  const id = req.params.id;
  Actor.findByPk(id, {}).then((object)=>{
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
  Actor.destroy({where:{id:id}}).then(object => res.json(object));
}

module.exports = {
  list, index, create, update, destroy
}
