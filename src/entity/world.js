class World extends Entity{

  init(args){
      super.init(args);
      this.type="world";
      this.generation = 0;
      this.size = [0,0];
      this.children = [];
      this.agents = [];
      this.templates = {};
      this.generations = [];
      this.state = {
        numAgents : {
          total: 0
        }
      }

      if(args.size!=null){
        this.size = args.size;
      }
      if(args.generation!=null){
        this.generation = args.generation;
      }
      if(args.generations!=null){
        this.generation = args.generations;
      }

      if(args.agents!=null){
        this.agents = args.agents;
      }
      if(args.templates!=null){
        for(let t of args.templates){
          this.templates[t["name"]] = t;
        }
      }
  }


  start(){
    if(this.children.length==0){
      //alert(this.agents.length);
      for(let a of this.agents){
        var ag = new Agent(this.templates[a.template]);
        if(a.name!=null){
          ag.name = a.name;
        } else {
          ag.name = a.template;
        }
        ag.template = a.template;
        ag.position = a.position;
        ag.world = this;
        this.children.push(ag);
      }
    }
    //alert(this.children.length);
  }



  remove(){

  }

  run(){

  }


  getAgents(template){
    var ag = [];
    for(let a of this.children){
      if(a.template==template){
        ag.push(a)
      }
    }
    return ag;
  }

  get(position){
      return this.positions[position[0]][position[1]]
  }

  toJson(){
    var js = super.toJson();
    js.generation = this.generation;
    js.size = this.size;
    js.agents = [];
    for(a of this.agents){
      var name = null;
      if(a.name!=null){
        name = a.name;
      }
      js.agents.push({
        template: a.template,
        name: name,
        position: a.position
      });
    }
    js.templates = [];
    for(t in this.templates){
      js.templates.push(this.templates[t]);
    }
    return js;

  }



}
