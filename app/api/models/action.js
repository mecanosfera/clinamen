var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Behavior = require('./behavior');

var Action = Behavior.discriminator(
  'Action',
  new Schema({
    mainType: {type: String, required: true, default: 'action'},
    type: {type: String, required: true, default: 'action'},
    target: Schema.Types.Mixed,
    filter: Schema.Types.Mixed,
    act: String,
    value: [Schema.Types.Mixed]
  })
);

module.exports = Action;
