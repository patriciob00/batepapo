
var mongoose     = require('mongoose');
var QueryPlugin  = require('mongoose-query');
var Schema       = mongoose.Schema;

var MensagemSchema   = new Schema({
    remetente: Schema.Types.Mixed,
    destinatario: Schema.Types.Mixed,
    msg:String,
    data: {type : Date, default: Date.now }
});

MensagemSchema.plugin(QueryPlugin);

module.exports = mongoose.model('Mensagem', MensagemSchema);