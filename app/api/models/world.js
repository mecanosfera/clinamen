var mongoose = require('mongoose');
var Schema = mongoose.Schema
var Entity = require('./entity');

var World = Entity.discriminator(
  'World',
  new Schema({
    mainType: {type: String, required: true, default: 'world'},
    type: {type: String, required: true, default: 'world'},
    instances: [Schema.Types.Mixed],
    templates: [Schema.Types.Mixed]
  })
);


module.exports = World;
