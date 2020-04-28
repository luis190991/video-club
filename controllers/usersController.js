const express = require('express');

// todos los elementos GET / => list
function list(req, res, next) {
  res.render('index', { title: 'Mi app de video list' });
}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  res.render('index', { title: 'Mi app de video index' });
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  res.render('index', { title: 'Mi app de video create' });
}

// modifica un elemento PUT /:id => update
function update(req, res, next) {
  res.render('index', { title: 'Mi app de video update' });
}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {
  res.render('index', { title: 'Mi app de video destroy' });
}

module.exports = {
  list, index, create, update, destroy
}
