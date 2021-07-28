var mongoose = require('mongoose');
var esquema = new mongoose.Schema(
    {
        nombreCategoria: String,
        descripcion: String,
        aplicaciones: Array
    }
);

module.exports = mongoose.model('categorias', esquema);