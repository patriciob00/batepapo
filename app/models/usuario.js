
var mongoose     = require('mongoose');
var QueryPlugin  = require('mongoose-query');

var Schema       = mongoose.Schema;

var UsuarioSchema   = new Schema({
    nome : String,
    //email: { type: String, unique: true },
    email: String,
    senha: String

});

UsuarioSchema.plugin(QueryPlugin);

module.exports = mongoose.model('Usuario', UsuarioSchema);