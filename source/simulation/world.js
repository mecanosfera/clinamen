class World extends Entity{

  init(args){
      super.init(args);
      this.type="world";

      this.gen = 0;
      this.size = [0,0];
      this.agents = [];
      this.agentsType = {};
      this.templates = {};
      this.positions = [];
      this.generations = [];
      this.started = false;
      this.prop = {
        numAgents : {
          total: 0
        }
      }

      if(args.size!=null){
        this.size = args.size;
      }
      if(args.gen!=null){
        this.gen = args.gen;
      }
      if(args.positions!=null){
        this.positions = args.positions;
      } else {
        for(let x=0;x<this.size[0];x++){
          this.positions.push([]);
          for(let y=0;y<this.size[1];y++){
            this.positions[x].push(null);
          }
        }
        //this.positions = Array(this.size[0]).fill(Array(this.size[1]));
      }
      if(args.generations!=null){
        this.generation = args.generations;
      }
      if(args.agents!=null){
        for(let a of args.agents){
          this.add(a,a.position);
        }
      }
  }

  has(type){
    if(this.started){
      if(this.agentsType[type]){
        return this.agentsType[type].length>0;
      }
    } else {
      if(this.templates[type]){
        return this.agentsType[type].positions.length>0;
      }
    }
    return false;
  }

  add(agent,position){
    var ag = agent;
    if(!(ag instanceof Agent)){
      ag = new Agent(agent);
    }
    if(this.templates[ag.template]==null){
      this.templates[ag.template] = {
        agent:ag,
        positions: []
      };
      //alert(this.templates[ag.template].agent.template);
    }
    if(position!=null){
      this.templates[ag.template].positions.push(position);
      this.prop.numAgents.total += 1;
      if(this.prop.numAgents[ag.template]==null){
        this.prop.numAgents[ag.template] = 0;
      }
      this.prop.numAgents[ag.template] += 1;
    }
  }


  start(){
    for(let tp in this.templates){
      var js = this.templates[tp].agent.toJson();
      for(let pos of this.templates[tp].positions){
        var ag = new Agent(js);
        ag.position = pos;
        ag.world = this;
        if(this.agetsType[ag.template]==null){
          this.agentsType[ag.template] = [];
        }
        this.agentsType[ag.template].push(ag);
        if(ag.position[0]>-1){
          this.positions[ag.position[0]][ag.position[1]] = ag;
        }
      }
    }
    this.started = true;
  }


  remove(){

  }

  run(){

  }



}
