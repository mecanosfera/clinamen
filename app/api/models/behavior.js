var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Entity = require('./entity');

var behaviorSchema = new Schema({
    mainType: {type: String, required: true, default: 'behavior'},
    type: {type: String, required: true, default: 'behavior'},
    name: String,
    prop: Schema.Types.Mixed,
    children: [Schema.Types.Mixed]
});

var Behavior = mongoose.model('Behavior', behaviorSchema);

module.exports = Behavior;
