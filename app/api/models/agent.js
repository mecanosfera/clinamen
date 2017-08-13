var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Entity = require('./entity');

var Agent = Entity.discriminator(
  'Agent',
  new Schema({
    mainType: {type: String, required: true, default: 'agent'},
    type: {type: String, required: true, default: 'agent'},
    template: {type: String, required: true}
  })
);

module.exports = Agent;
