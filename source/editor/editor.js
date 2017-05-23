class Editor {

  constructor(args){
    this.init(args);
  }

  init(args){
    this.worlds = [];
    this.agents = [];
    this.trees = [];
    this.simulation = null;

    this.world;
    this.mainAgent;
    this.mainTree;

    if(args.worlds!=null){
      this.worlds = args.worlds;
    }
    if(args.simulation!=null){
      this.simulation = args.simulation;
    }
    this.state = "start";

    this.states = {
      "start": this.start,
      "select": this.select,
      "edit": this.edit,
      "test": this.test,
      "end": this.end
    };
  }

  start(){}

  select(){}

  edit(){}

  test(){}

  end(){}

  editWorld(world){
    this.world = world;
    if(world==null){
      this.world = new World({});
    }

  }

}
