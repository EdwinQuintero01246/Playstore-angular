var express = require('express');
var router = express.Router();
var categoria = require('../models/categoria');
var mongoose = require('mongoose');
/*todas las categorias*/
router.get('/',function (req, res){
    categoria.find({},{_id: true, nombreCategoria:true})
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});
/*una categoria con todas las app */
router.get('/:idCategoria',function (req, res){
    categoria.find({_id: req.params.idCategoria},{})
    .then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});
/* una app*/
router.get('/:idCategoria/applicaciones/:idApp',function (req, res){
    categoria.find(
        {
            _id: req.params.idCategoria,
            "aplicaciones._id": mongoose.Types.ObjectId(req.params.idApp)
        },{"aplicaciones.$":true})
    .then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//eliminar app
router.delete('/:idCategoria/applicaciones/:idApp',function(req,res){
    categoria.update(
        {_id: req.params.idCategoria,},
        { $pull:{"aplicaciones":{_id:mongoose.Types.ObjectId(req.params.idApp)}}},
        {multi:true}
    ).then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});
//crear u coomentario
router.post('/:idCategoria/applicaciones/:idApp/comentario',function (req, res) {
    categoria.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idCategoria),
            "aplicaciones._id":mongoose.Types.ObjectId(req.params.idApp)
        },
        {
            $push:{
                "aplicaciones.$.comentarios":{
                    calificacion:req.body.calificación,
                    comentario:req.body.comentario,
                    fecha:req.body.fecha,
                    usuario:req.body.usuario
                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});
//crear un app
router.post('/:idCategoria/applicaciones/',function (req, res) {
    categoria.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idCategoria),
        },
        {
            $push:{
                "aplicaciones":{
                    _id :mongoose.Types.ObjectId(),
                    nombre:req.body.nombre,
                    descripcion:req.body.descripcion,
                    icono:req.body.icono,
                    instalada:req.body.instalada,
                    app:req.body.app,
                    calificacion:req.body.calificacion,
                    descargas:req.body.descargas,
                    precio:req.body.precio,
                    desarrollador:req.body.desarrollador,
                    imagenes: [],
                    comentarios:[]
                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});
module.exports = router;