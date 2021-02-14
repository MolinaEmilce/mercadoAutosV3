const fs = require('fs');
const path = require('path'); //indica que estamos en  la rutas principal
const bcrypt = require('bcrypt'); // inidica el hashing, encriptar las contraseñas

const{getAutos,setAutos}= require(path.join('..','data','autos')); //hay dos puntos xq estamos dentro de controller, signficia que salimos y ya estamos en la carpeta principal
const {getAdmins,setAdmins} = require(path.join('..','data','admins'));
//json parseado
const autos = getAutos(); //ejecuta la propiedad del js, nos trae el json parseado.
const admins = getAdmins();  //ejecutamos el json parseado
module.exports = {
    //------------------ADMINISTRADORES----------
    register: (req,res)=>{
        res.render('admin/register');
    },
    login : (req,res)=>{
        res.render('admin/login');
    },
    //capturamos los datos que vienen por el formulario
    processRegister : (req,res)=>{
    //name de los inputs, traemos los datos del formulario
    const {username,pass} = req.body

    //--------------VALIDACIONES ....
    //dato :  si la varible esta vacia es false, si tiene datos es true
    if(!username || !pass){ //si los campos estan vacios
        return res.redirect('/admin/register'); //volvemos a la misma pagina, no hace nada
    }

    //si el usuario esta repetido mande un mensaje, de lo contrario que ya lo cree y sigue con los siguientes pasos
    let result = admins.find(cadaAdmin => cadaAdmin.username.toLowerCase() === username.toLowerCase().trim());
    if(result){
        return res.render('admin/register',{
            error : "Usuario ya en uso"
        })
    }


    let lastID = 0;
    admins.forEach(cadaAdmin=>{
        //si cumple la condicion, el lastID puesto  se cambia y tendra como valor el id actual que estamos recorriendo
        if(cadaAdmin.id > lastID){
            lastID = cadaAdmin.id;
        }
    });

    //encriptar contraseña
    //      (lo que va encrpitar, cantidad);
    let passHash = bcrypt.hashSync(pass.trim(),12);

    const newAdmin = {
        id : +lastID + 1,
        username : username.trim(), //dato del form,  no le asignamos valor, porque tiene el mismo nombre y automaticamente se almacena 
        pass : passHash // tambien lo mismo, trae el dato del form pero en este caso la contraseña encryptada
    }
    admins.push(newAdmin);
    setAdmins(admins);
    res.redirect('/admin/login');



    },

    processLogin : (req,res)=>{
        const{username,pass} = req.body;
//encuentra el dato en el json que sea igual al campo pasado por el formulario, si no encuentra nada es un strin vacio
        let result = admins.find(cadaAdmin => cadaAdmin.username.toLowerCase() === username.toLowerCase().trim());
        if(result){ //***si encontro el usuario, es decir la variable tiene string
            //compara las contraseñas
            if(bcrypt.compareSync(pass.trim(),result.pass)){
                return res.redirect('/admin'); //nos deja entrar al admin
            }else{ // si no coincide la contraseña
                res.render('admin/login',{
                    error : "Crontraseña invalida"
                });
            }
        }else{ //**si no encontro el usuario, es decir el campo esta vacio
            res.render('admin/login',{
                error : "Usuario invalido"
            });
        }


    }, //--------------------------------------


    index : (req,res)=>{
        res.render('admin/index');
    },
    carList : (req,res)=>{
        res.render('admin/carList',{
        autos
        });
    },
    carCreate : (req,res)=>{
        res.render('admin/carCreate');
    },
    carStore : (req,res,next)=>{
     res.send(req.files);
       let lastID = 1;
       autos.forEach(cadaAuto => {
           if(cadaAuto.id > lastID){
               lastID = cadaAuto.id //La variable creada va a cambiar si el id del json es mayor a su valor
           }
       });

       //captura todos las propiedades con los valores del json creandolas en variables
        const {marca,modelo,color,anio,img} = req.body
       const auto = {
           //toda la informacion captada por formulario se pasa aca
           id: Number(lastID + 1),
           marca,
           modelo,
           color,
           anio,
           img : req.files[0].filename //PARA QUE SE GUARDE EN EL JSON, es decir guarda el nombre de la imagen que configuramos en la ruta con el multer 
       }
    autos.push(auto); //se agrega al json parseado
    setAutos(autos); //sobreescribe el json , viene de la carpeta data autos.js
    //te redirige a una ruta
    res.redirect('/admin/autos/list');
    },
    carEdit : (req,res)=>{
        const auto = autos.find(cadaAuto => cadaAuto.id === +req.params.id);
        res.render('admin/carEdit',{
            auto
        });
    },   //llegamos con un put
    carUpdate : (req,res)=>{
        const {marca,modelo,color,anio,img} = req.body;
        autos.forEach(cadaAuto=>{
           //reemplaza los valores de los objetos
           if(cadaAuto.id === +req.params.id){

            cadaAuto.id = Number(req.params.id);
            cadaAuto.marca = marca;
            cadaAuto.modelo = modelo;
            cadaAuto.anio = anio;
            cadaAuto.color = color;
            cadaAuto.img = img;
           }
            
        });

        //se guarda en la base de datos
        setAutos(autos); //sobreescribe el json , viene de la carpeta data autos.js
        res.redirect('/admin/autos/list');
    },
    carDelete : (req,res)=>{
      autos.forEach(cadaAuto=>{
          if(cadaAuto.id === +req.params.id){//si coincide con el id
          //PARA QUE TAMBIEN SE ELIMINEN LOS ARCHIVOS SUBIDOS EXTERNOS DEL JSON
                if(fs.existsSync(path.join('public','images','autos',cadaAuto.img))){ //existsSync: nos permite saber si el archivo existe o no
                fs.unlinkSync(path.join('public','images','autos',cadaAuto.img)); //se aplica al link 
                }
    //se va aguardar la posicion =  del archivo json parseado busca el auto especifico que cumple la condicion
            var aEliminar = autos.indexOf(cadaAuto);//en  el auto especifica nos busca su posicion
              autos.splice(aEliminar,1); //con la posicion encontrada lo elimina en l archivo json parseado
                //el 1 es para que se te elimine solo un elemento
            }
      });
      //se guarda en la base de datos
      setAutos(autos); //sobreescribe el json , viene de la carpeta data autos.js
      res.redirect('/admin/autos/list');
    }
}





/*

req.params   = recibe los parametros
req.query   = va por get o string
req.body  = recibe por body por el form, recopila toda la informacion que se pasa en el body  ... pero  se tiene que hacer una config en el app.js
res.redirect  = TE MANDA DIRECTO A LA RUTA 
*/