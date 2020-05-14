const express = require('express');
const controller = require('../controllers/genresController')
const router = express.Router();

router.get('/', controller.list);

router.get('/:id', controller.index);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);


module.exports = router;
