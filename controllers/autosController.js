const autos= require('../data/autos');

module.exports = {
    index : (req,res)=>{
        res.render('autos',{ //envia todos los datos a este archivo, para que se puedan acceder a sus ropiedades libremente 
            title : "Listado de Autos",
            autos //no tiene  : variable xq tienen el mismo nombre 
        });
    },
    //show renderiza un auto en particular
    show : (req,res)=>{ //find : busca el primer elemento que coincia segun condicion ,te devuelve solo un array
        let auto = autos.find(cadaAuto=>{
            return cadaAuto.id === Number(req.params.id);
        });
        res.render('autosShow',{
            title : "Vista de Detalle",
            cadaAutoId : auto
        });
    },
    buscar : (req,res)=>{
        //req.query te trae un array en string
       const resultado = autos.filter(cadaAuto=>{
           return cadaAuto.modelo.includes(req.query.busqueda);
        });
        res.render('autos',{ //envia todos los datos a este archivo, para que se puedan acceder a sus ropiedades libremente 
            title : "Listado de Busqueda",
            autos : resultado //asi el codigo es reutilizable 
        });
    }
}