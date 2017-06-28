class Simulation {

  constructor(args){
    this.init(args);
  }

  init(args){
    this.ui = new SimulationUI(this);
    this.worlds = this.load();

  }
}
