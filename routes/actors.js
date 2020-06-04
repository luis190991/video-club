var express = require('express');
const actorController = require('../controllers/actorsController')
var router = express.Router();

/* GET users listing. */
router.get('/create', actorController.form);

router.get('/index/:id', actorController.index);

router.get('/:page?', actorController.list);

router.post('/', actorController.create);

router.put('/:id', actorController.update);

router.delete('/:id', actorController.destroy);


module.exports = router;
