var express = require('express');
const userController = require('../controllers/usersController')
var router = express.Router();

/* GET users listing. */
router.get('/', userController.list);

router.get('/:id', userController.index);

router.post('/', userController.create);

router.put('/:id', userController.update);

router.delete('/:id', userController.destroy);


module.exports = router;
