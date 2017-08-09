var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var entitySchema = new Schema({
  _user: Schema.Types.ObjectId,
  user: Schema.Types.Mixed,
  name: String,
  type: {type: String, required: true, default: 'entity'},
  prop: Schema.Types.Mixed,
  children: [Schema.Types.Mixed]
});

var Entity = mongoose.model('Entity', entitySchema);

var World = Entity.discriminator(
  'World',
  new Schema({
    type: {type: String, required: true, default: 'world'},
    instances: [Schema.Types.Mixed],
    templates: [Schema.Types.Mixed]
  });
);


var Agent = Entity.discriminator(
  'Agent',
  new Schema({
    type: {type: String, required: true, default: 'agent'},
    _world: Schema.Types.ObjectId,
    world: World,
    template: {type: String, required: true}
  });
);

var Behavior = Entity.discriminator(
  'Behavior',
  new Schema({
    type: {type: String, required: true, default: 'behavior'},
    _agent: Schema.Types.ObjectId,
    agent: Agent
  });
);

module.exports = Entity;
module.exports = World;
module.exports = Agent;
module.exports = Behavior;
