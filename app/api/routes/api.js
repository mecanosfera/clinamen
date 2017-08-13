var bodyParser = require('body-parser'); 	// get body-parser
var config     = require('../../../config');
//var User       = require('../models/user');
var Entity     = require('../models/entity');
var World      = require('../models/world');
var Agent      = require('../models/agent');
var Behavior   = require('../models/behavior');
var Decorator  = require('../models/decorator');
var Action     = require('../models/action');


module.exports = function(app,express){

  var apiRouter = express.Router();



  function getEntity(entity,req,res){
    entity.find({},function(err,entities){
      if(err){
        res.send(err);
      }
      res.json(entities);
    });
  }

  function getEntityById(entity,req,res){
    entity.findById(req.params.entity_id,function(err,ent){
      if(err){
        res.send(err);
      }
      res.json(ent);
    });
  }

  function removeEntity(entity,req,res){
    entity.remove(
      {_id: req.params.entity_id},
      function(err, world) {
        if (err){
          res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    });
  }


  apiRouter.route('/world')
    .get(function(req,res){
      getEntity(World,req,res);
    })
    .post(function(req,res){
      var world = new World();
      var w = req.body;
      world.name = w.name || null;
      world.prop = w.prop || {};
      world.type = w.type || 'world';
      world.templates = w.templates || [];
      world.instances = w.instances || [];
      world.save();
      res.json({success:world._id});
    });

apiRouter.route('/world/:entity_id')
  .get(function(req,res){
    getEntityById(World,req,res);
  })
  .put(function(req,res){
    World.findById(req.params.entity_id,function(err,world){
      if(err){
        res.send(err);
      }
      var w = req.body;
      if(w.name){
        world.name = w.name;
      }
      if(w.type){
        world.type = w.type;
      }
      if(w.prop){
        world.prop = w.prop;
        world.markModified('prop');
      }
      if(w.templates){
        world.templates = w.templates;
        world.markModified('templates');
      }
      if(w.instances){
        world.instances = w.instances;
        world.markModified('instances');
      }
      world.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({update:world._id});
      });

    });
  })
  .delete(function(req,res){
      removeEntity(World,req,res);
  });

  apiRouter.route('/agent')
    .get(function(req,res){
      getEntity(Agent,req,res);
    })
    .post(function(req,res){
      var agent = new Agent();
      var a = req.body;
      agent.name = a.name || null;
      agent.prop = a.prop || {};
      agent.type = a.type || 'agent';
      agent.children = a.children || [];
      agent.template = a.template || agent.type;
      agent.save();
      res.json({success:agent._id});
    });

apiRouter.route('/agent/:entity_id')
  .get(function(req,res){
    getEntityById(Agent,req,res);
  })
  .put(function(req,res){
    Agent.findById(req.params.entity_id,function(err,agent){
      if(err){
        res.send(err);
      }
      var a = req.body;
      if(a.name){
        agent.name = a.name;
      }
      if(a.prop){
        agent.prop = a.prop;
        agent.markModified('prop');
      }
      if(a.template){
        agent.template = a.template;
      }
      if(a.children){
        agent.instances = a.children;
        agent.markModified('children');
      }
      agent.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({update:agent._id});
      });

    });
  })
  .delete(function(req,res){
      removeEntity(Agent,req,res);
  });



  apiRouter.route('/behavior')
    .get(function(req,res){
      getEntity(Behavior,req,res);
    })
    .post(function(req,res){
      var behavior;
      var b = req.body;
      if(b.mainType=="behavior"){
        behavior = new Behavior();
      } else if (b.mainType=="decorator"){
        behavior = new Decorator();
        behavior.scope = b.scope;
        behavior.max = b.max;
        behavior.runs = b.runs;
        behavior.filter = b.filter;
        behavior.result = b.result;
        behavior.child = b.child;
      } else if (b.mainType=="action"){
        behavior = new Action();
        behavior.target = b.target;
        behavior.filter = b.filter;
        behavior.act = b.act;
        behavior.value = b.value;
      }
      behavior.type = b.type || behavior.mainType;
      behavior.name = b.name;
      behavior.prop = b.prop || {};
      behavior.children = b.children || [];
      behavior.save();
      res.json({success:behavior._id});
    });

apiRouter.route('/behavior/:entity_id')
  .get(function(req,res){
    getEntityById(Behavior,req,res);
  })
  .put(function(req,res){
    var b = req.body;
    var behaviorModel;
    if(b.mainType=="behavior"){
      behaviorModel = Behavior;
    } else if (b.mainType=="decorator"){
      behaviorModel = Decorator;
    } else if (b.mainType=="action"){
      behaviorModel = Action;
    }

    behaviorModel.findById(req.params.entity_id,function(err,behavior){
      if(err){
        res.send(err);
      }
      if(b.type!==null){
        behavior.type = b.type;
      }
      if(b.name!==null){
        behavior.name = b.name;
      }
      if(b.prop!==null){
        behavior.prop = b.prop;
        behavior.markModified('prop');
      }
      if(b.children!==null){
        behavior.instances = b.children;
        behavior.markModified('children');
      }
      if(b.mainType=="decorator"){
        if(b.scope!==null){
          behavior.scope = b.scope;
        }
        if(b.max!==null){
          behavior.max = b.max;
        }
        if(b.runs!==null){
          behavior.runs = b.runs;
        }
        if(b.filter!==null){
          behavior.filter = b.filter;
          behavior.markModified('filter');
        }
        if(b.result!==null){
          behavior.result = b.result;
          behavior.markModified('result');
        }
        if(b.child!==null){
          behavior.child = b.child;
          behavior.markModified('child');
        }
      } else if (b.mainType=="action"){
        if(b.act!==null){
          behavior.act = b.act;
        }
        if(b.filter!==null){
          behavior.filter = b.filter;
          behavior.markModified('filter');
        }
        if(b.target!==null){
          behavior.target = b.target;
          behavior.markModified('target');
        }
        if(b.value!==null){
          behavior.value = b.value;
          behavior.markModified('value');
        }
      }
      behavior.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({update:behavior._id});
      });

    });
  })
  .delete(function(req,res){
      removeEntity(Behavior,req,res);
  });




  apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });
  });

  return apiRouter;

};
