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
