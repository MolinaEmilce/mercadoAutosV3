//modulo para parsear el json

const fs = require('fs');
const path = require('path'); //facilita las rutas
//nos dice donde esta lo que esta pasado por parametro
const admins_db = path.join('data','admins.json'); //es un archivo que esta dentro de la carpeta data
//__dirname : te lleva a la ruta correcta dle archivo, nos da la ruta 
module.exports = {
    getAdmins : ()=>{ //devuelve json parseadp
        return JSON.parse(fs.readFileSync(admins_db,'utf-8'));
    },
    setAdmins : (data) =>{//setea el json, lo sobreescribe al json
         //se convierte en json y se escribe en el json
        fs.writeFileSync(admins_db,JSON.stringify(data,null,2),'utf-8');
    /* le agregamos null,2 al  stringify para me idente, es decir me los  separe uno debajo del otro los datos de JSON */
    }

}






//path:  nos facilita las rutas de las carpetas y tiene muchos metodos. (carpeta principal del archivo,el archivo)
//path parte desde la carpeta raiz, es decir de nuestro caperta del proyecto