var express = require('express');
const actorController = require('../controllers/actorsController')
var router = express.Router();

/* GET users listing. */
router.put('/:id', actorController.update);

router.get('/create', actorController.form);

router.get('/edit/:id', actorController.edit);

router.get('/index/:id', actorController.index);

router.get('/:page?', actorController.list);

router.post('/', actorController.create);



router.delete('/:id', actorController.destroy);


module.exports = router;
