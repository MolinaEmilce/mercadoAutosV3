const express = require('express');
const router = express.Router();


//CONTROLADOR - FUNCIONES  ACCIONES 
const indexController = require('../controllers/indexController');
router.get('/',indexController.index);
router.get('/about', indexController.about)


module.exports = router;