module.exports = {
    index: (req,res)=>{
        //render : renderiza vista , (nommbrearchivo de la vista, objeto con propiedades)
        res.render('home',{
            title : "Mercado Autos",
            mensaje : "Bienvenido a mi sitio"
        });
        /*Render(archivo html que queres que renderice): valida html, img videos etc */
    },
    about : (req,res)=>{
        res.render('about');
    }
}