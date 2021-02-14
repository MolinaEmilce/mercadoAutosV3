const {check, validationResult, body}= require('express-validator'); //las 3 constantes que salen del nucleo de express validator 
const {getAdmins} = require ('../data/admins');
const admins = getAdmins(); //json de admins
module.exports = [ //el 2do parametro viene de expressvalidator,  vamos a validar los campos(inputs del formulario)
    check('username').notEmpty().withMessage('El campo username es requerido'), //que el campo con el name del (input), no este vacio
    check('pass').notEmpty().withMessage('El campo password es requerido'),
    //con custom creamos nuestra propia validacion nuestra propia condicion para que sea false o true!!!
    body('username').custom(value => { //con body estamos validando si el usuario ya esta registrado  o no 
        //al poner un dato en el input, el value pasa a tener el valor del input ingresado, y se busca en la base de datos aca
        let result = admins.find(cadaAdmin => cadaAdmin.username.toLowerCase() === value.toLowerCase().trim());
        if(result) { //si paso la validacion es verdadero es que ya hay un usuario
            return false; //no va  pasar la validacion xq ya esta registrado
        }else{ //
            return true; //pasa la validacion xq no esta registrado todavia 
        }
    }).withMessage('El usuario ya esta registrado') //validacion personalizada
]
