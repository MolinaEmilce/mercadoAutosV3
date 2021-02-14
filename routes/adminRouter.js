const express = require('express');
const router = express.Router();

const upload = require('../middlewares/subidaImagenes'); //subida de archivos configuracion
const {register,login,processLogin,processRegister,index,carList,carEdit,carCreate,carDelete,carUpdate,carStore, listAdmins, profileAdmins} = require('../controllers/adminController');
const registerAdminValidator = require('../validations/registerAdminValidator');



router.get('/',index);


//ENTIDAD ADMINISTRADORES
router.get('/register',register); //trae renderiza el formulario vacio
router.post('/register',registerAdminValidator, processRegister); //ejecuta procesa la informacion del formulario

router.get('/login',login);
router.post('/login',processLogin);

router.get('/list',listAdmins);
router.get('/profile/:id', profileAdmins);



//ENTIDAD AUTOS 
router.get('/autos/list', carList);

router.get('/autos/create',carCreate); // trae solo el formulario ingresa datos nuevos SOLO INGRESASS
//  se le agrega un 2° parametro del archivo subido por el formulario, any es mas general
router.post('/autos/store',upload.any(), carStore); //recibe datos nuevos y los guardas - ACA SE TERMINA DE CREAR Y SE GUARDA

router.get('/autos/edit/:id',carEdit); //SOLO CARGA los datos precargados que queremos editar SOLO LO TRAE
router.put('/autos/update/:id',carUpdate); //RECIBE DATOS del formulario precargado y si hay cambios guardamos en el mismo, SE GUARDA MODIFICACIONES


router.delete('/autos/delete/:id',carDelete); //BORRA un registro que cooincida con el id
module.exports = router;