var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var entitySchema = new Schema({
  _user: Schema.Types.ObjectId,
  //user: User,
  name: String,
  mainType: {type: String, required: true, default: 'entity'},
  type: {type: String, required: true, default: 'entity'},
  prop: Schema.Types.Mixed,
  children: [Schema.Types.Mixed]
});

var Entity = mongoose.model('Entity', entitySchema);


module.exports = Entity;
