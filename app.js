const express = require('express'); //Requiere el modulo express
const app = express(); //ejecuta express

/*-------CONFIGURACION-------- */
//MOTOR DE VISTA:      motor de vist es ejs  : renderiza los archivos
app.set('view engine','ejs'); //setea algunos aspectos de vista. motores de vista(ejs);
//UBICACION DE VISTA: 
//dirname : te da la ruta completa donde estas clickeando + nombrecarpeta
app.set('views',__dirname + '/views')//donde se encuentra nuestras vistas?
const port = 3500;

//confiragamos el metodo override(delete y put) que instalamos por npm 
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

/* ---IDE BOARD-- ACCESIBLE A TODAS LAS VISTA(img,video,etc), CADA VEZ QUE SE EJECUTA PASA X ACA, */
//                      (recursos estaticos)
app.use(express.static(__dirname + '/public'))


//--------------------------------------------------------------------------
/*configruacion para hacer el crud y usar el req.body*/
/*Te permite recopilar informacion que mandamos por el formulario que encima es todo string, 
internamente express te lo convierte en OBJETO LITERAL 
 */
app.use(express.urlencoded({extended:false})); 

app.use(express.json()); //mismos datos convertidos en JSON

//------------------------------------------------------------------------

//RUTAS
const indexRouter = require('./routes/indexRouter');
const autosRouter = require('./routes/autosRouter');

const adminRouter = require('./routes/adminRouter')
app.use('/', indexRouter);
app.use('/autos',autosRouter);
app.use('/admin',adminRouter);








app.listen(port,()=>console.log('Servidor corriendo en ... ' + port));


/*INSTALACIONES:

extension EJS LANGUAGUE SUPORT

para poder renderizar vistas /views 
hay que instalar ejs : npm install ejs --save*/