class UI {

  constructor(size){
    this.size = size;
    this.grid = new Grid(this);
    this.grid.draw();
  }
}
