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
          this.add(a);
        }
      }
  }

  has(type){
    if(this.agentsType[type]){
      return this.agentsType[type].length>0;
    }
    return false;
  }

  add(agent){
    var ag = agent;
    if(!(ag instanceof Agent)){
      ag = new Agent(agent);
    }
    ag.world = this;
    if(!this.agentsType[ag.type]){
      this.agentsType[ag.type] = [];
    }
    this.agents.push(ag);
    this.agentsType[ag.type].push(ag);
    if(ag.position[0]>-1){
      this.positions[ag.position[0]][ag.position[1]] = ag;
    }
    this.addTemplate(agent);

  }

  add(agent){
    
  }

  addTemplate(agent){
    if(this.templates[agent.type]==null){
      this.templates[agent.type] = agent;
    }
  }

  generateAgent(type,position){
    if(this.templates[type]!=null){
      var ag = new Agent(this.templates[type].toJson());
      if(!this.agentsType[ag.type]){"op"
        this.agentsType[ag.type] = [];
      }
      if(position!=null){
        ag.position = position;
        this.positions[ag.position[0]][ag.position[1]] = ag;
      }
    }
  }

  start(){

  }



  remove(){

  }

  run(){

  }



}
