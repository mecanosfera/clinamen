class Simulation {

  constructor(args){
    this.init(args);
    //alert("aaaaaa");
  }

  init(args){

    this.worlds = this.load();
    this.world = null;
    this.running = false;
    this.zoom = 1;
    this.delay = 1;
    this.size = [0,0];

    this.ui = new SimulationUI([this]);
  }

  load(){
    var ws = [];
    for(let w of worlds){
      ws.push(new World(w));
    }
    return ws;
  }

  select(world){
    this.world = world;
    this.world.start();
    this.size = world.size;
    this.ui.select();
  }


  next(){
    for(let a of this.world.children){
      a.run();
    }
    for(let nx of this.world.children){
      if(nx.nextPosition!=null){
        this.world.positions[nx.position[0]][nx.position[1]] = null;
        nx.position = nx.nextPosition;
        nx.nextPosition = null;
        this.world.positions[nx.position[0]][nx.position[1]] = nx;

      }
      if(nx.nextState!=null){
        
        for(let s in nx.nextState){
          nx.state[s] = nx.nextState[s];
        }
        nx.nextState = null;
      }
    }
    this.world.generation++;
    this.draw();
  }

  play(){

  }

  pause(){

  }

  stop(){

  }

  update(){

  }

  draw(){
    this.ui.draw();
  }

}
