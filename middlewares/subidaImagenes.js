//----------------processamiento de archivos subidos al servidor---------
const path = require('path');
const multer = require('multer'); //multer es un modulo para almacenar y procesar los archivos externos subidos x el formulario
// se procesa entre la peticion y la respuesta, esta entre medio de ellos, de lo que se esta x subir y  la accion de subida
const storage = multer.diskStorage({
//    (cb es callback)
    destination : (req,file,cb)=>{ //donde se va almacenar
   //(null cuando hay errores, destino en donde se va almacenar el archivo   )   
    cb(null,'public/images')
    },
    filename : (req,file,cb)=>{ //se guarda con el nombre indicado , (fieldname es el nombre del input)
    //           fieldname : nombre del campo+fecha actual + extname nos da la extencion, (originalname extrae el nombre original del archivo)
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname)); //nos da el nombre que pusimos y configuramos aca
    }
})

    const upload = multer({storage}); //
//---------------------------------------------------------------

module.exports = upload;