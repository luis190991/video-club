const express = require('express');
const Actor = require('../models/actor');


// todos los elementos GET / => list
function list(req, res, next) {
  let name = "listado de todos los actores" ;
  let page = req.params.page? req.params.page : 1;
  const options = {
    page: page,
    limit: 5
  };

  Actor.paginate({}, options).then((actors)=>{
    console.log(actors)
    res.render('actors/list', {
      title:"Actores en mi video club",
      cabecera:name,
      actors:actors
     });
  });
}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  let object = new Actor({_name:"Leonardo", _lastName:"Di Caprio"});
  Actor.create(object).then(obj => res.render('actors/list', {title:"Actores en mi video club",
  cabecera:"",
  actors:[]}));
}

function form(req, res, next){
  let name = "Agregar un nuevo actor" ;
  res.render('actors/form', {title:name, cabecera: name });
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  let object = new Actor({
    _name: req.body.name,
    _lastName: req.body.lastName
  });
  Actor.create(object).then(obj => res.redirect('/actors/'));
}

// modifica un elemento PUT /:id => update
function update(req, res, next) {
  res.render('index', { title: 'Mi app de video update' });
}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {

}

module.exports = {
  list, index, form, create, update, destroy
}
