//modulo para parsear el json

const fs = require('fs');
const path = require('path'); //facilita las rutas
//nos dice donde esta lo que esta pasado por parametro
const autos_db = path.join('data','autos.json'); //es un archivo que esta dentro de la carpeta data
//__dirname : te lleva a la ruta correcta dle archivo, nos da la ruta 
module.exports = {
    getAutos : ()=>{ //devuelve json parseadp
        return JSON.parse(fs.readFileSync(autos_db,'utf-8'));
    },
    setAutos : (data) =>{//setea el json, lo sobreescribe al json
         //se convierte en json y se escribe en el json
        fs.writeFileSync(autos_db,JSON.stringify(autos),'utf-8');
    
    }

}






//path:  nos facilita las rutas de las carpetas y tiene muchos metodos. (carpeta principal del archivo,el archivo)
//path parte desde la carpeta raiz, es decir de nuestro caperta del proyecto