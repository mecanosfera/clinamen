var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Behavior = require('./behavior');


var Decorator = Behavior.discriminator(
  'Decorator',
  new Schema({
    mainType: {type: String, required: true, default: 'decorator'},
    type: {type: String, required: true, default: 'decorator'},
    max: Number,
    runs: Number,
    scope: String,
    child: Schema.Types.Mixed,
    filter: Schema.Types.Mixed,
    result: Schema.Types.Mixed

  })
);

module.exports = Decorator;
