class SimulationUI {

  constructor(simulation,size){
    this.simulation = simulation;
    this.size = size;
    this.grid = new Grid(this);
    this.grid.draw();
  }
}
