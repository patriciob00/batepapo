
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MensagemSchema   = new Schema({
    remetente: String,
    destinatario: String,
    msg:String,
    data: Date
});

module.exports = mongoose.model('Mensagem', MensagemSchema);