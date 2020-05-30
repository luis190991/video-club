const express = require('express');
const User = require('../models/user');
const async = require('async');
const bcrypt = require('bcrypt');


//user => email, name, last_name, password

// todos los elementos GET / => list
function list(req, res, next) {
  User.find().then(obj => res.status(200).json({
    message:'Usuarios del sistema',
    objs: obj
  })).catch(err => res.status(500).json({
    message: "error al cargar los usuarios del sistema",
    objs: err
  }));
}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  const id = req.params.id;
  User.findOne({"_id":id}).then(obj => res.status(200).json({
    message:`Usuario del sistema con id ${id}`,
    objs: obj
  })).catch(err => res.status(500).json({
    //message: `error al cargar el usuario del sistema con id = ${id}`,
    message: res.__('err.load.user', {"id":id}),
    objs: err
  }));
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  let email = req.body.email;
  let name = req.body.name;
  let lastName = req.body.lastName;
  let password = req.body.password;

  async.parallel({
    salt:(callback)=>{
      bcrypt.genSalt(10, callback);
    }
  }, (err, result)=>{
    bcrypt.hash(password, result.salt, (err, hash) =>{

      let user = new User({
        _email :email,
        _name: name,
        _lastName: lastName,
        _password : hash,
        _salt:result.salt
      });

      user.save().then(obj => res.status(200).json({
          message : 'usuario creado correctamente.',
          objs: obj
        })).catch(err => res.status(500).json({
          message: 'no se pudo guardar el usuario',
          objs: err
      }));
    });
  });
}

// modifica un elemento PUT /:id => update
function update(req, res, next) {
  res.render('index', { title: 'Mi app de video update' });
}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {
  const id = req.params.id;
  User.remove({"_id":id}).then(obj => res.status(200).json({
    message:`Usuario del sistema con id ${id} ha sido elimiando`,
    objs: obj
  })).catch(err => res.status(500).json({
    message: `error al eliminar el usuario del sistema con id = ${id}`,
    objs: err
  }));
}

module.exports = {
  list, index, create, update, destroy
}
