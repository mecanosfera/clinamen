class World extends Entity{

  init(args){
      super.init(args);
      this.type="world";
      this.generation = 0;
      this.size = [0,0];
      this.children = [];
      this.positions = [];
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
      for(let x=0;x<this.size[0];x++){
        this.positions.push([]);
        for(let y=0;y<this.size[1];y++){
          this.positions[x].push(null);
        }
      }
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
        if(a.state!=null){
          ag.state = a.state;
        }
        this.children.push(ag);
        this.positions[ag.position[0]][ag.position[1]] = ag;
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
      var p = position;
      if(position[0]<0){
        p[0]=this.size[0]-1;
      } else if (position[0]>=this.size[0]){
        p[0]=0;
      }
      if(position[1]<0){
        p[1]=this.size[1]-1;
      } else if (position[1]>=this.size[1]){
        p[1]=0;
      }
      return this.positions[p[0]][p[1]]
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
