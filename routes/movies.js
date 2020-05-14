const express = require('express');
const controller = require('../controllers/moviesController')
const router = express.Router();

router.get('/', controller.list);

//router.get('/:id', controller.index);

router.post('/', controller.create);

//router.put('/:id', controller.update);

//router.delete('/:id', controller.destroy);

router.post('/actors', controller.addActor);


module.exports = router;
