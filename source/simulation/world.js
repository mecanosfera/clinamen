class World extends Entity{


  init(args){
      super.init(args);
      this.type="world";
      this.agents = [];
      this.gen = 0;
      this.generations = [];

      if(args.gen!=null){
        this.gen = args.gen;
      }
      if(args.generations!=null){
        this.generation = args.generations;
      }
      if(args.agents!=null){
        this.agents = args.agents;
      }

  }

  has(type){
    if(this.agents[type]){
      return this.agents[type].length>0;
    }
    return false;
  }

  add(agent){
    if(!this.agents[agent.type]){
      this.agents[agent.type] = [agent];
    }
  }

  remove(){

  }

  run(){

  }

  saveGeneration(){

  }



}

class Generation extends Entity {

  init(args){
    super.init(args);
    this.type="generation";
    this.number;
    if(args.number!=null){
      this.number = number;
    }
    this.agents = [];
  }

}
