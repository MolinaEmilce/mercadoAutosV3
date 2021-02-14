const express = require('express');
const router = express.Router();

//destructuracion en objetos literales con sus propiedades,  dentro estan las propiedades del controlador
const {buscar,index,show} = require('../controllers/autosController');

router.get('/',index)
router.get('/show/:id',show);
router.get('/search', buscar);
module.exports = router;