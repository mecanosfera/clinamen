class UI {

  constructor(size){
    this.size = size;
    this.grid = new Grid(this);
    this.grid.draw();
  }
}





class Grid {

  constructor(ui,grid,size){
    this.ui = ui;
    this.zoom = ui.zoom;
		this.canvas = document.getElementById(grid);
    this.size = {X:size[0],Y:size[1]};
		this.canvas.width = this.size.X*20;
		this.canvas.height = this.size.Y*20;
		this.cxt = this.canvas.getContext('2d');
		this.tamanhoCelula = 20;
		this.updating = false;
  }

  draw(estados){
    for(let x=0;x<this.size.X;x++){
      for(let y=0;y<this.size.Y;y++){
          this.cxt.strokeStyle='#cccccc';
          this.cxt.fillRect(x*this.tamanhoCelula,y*this.tamanhoCelula,this.tamanhoCelula,this.tamanhoCelula);
    			this.cxt.strokeRect((x*this.tamanhoCelula),(y*this.tamanhoCelula),this.tamanhoCelula,this.tamanhoCelula);
      }
    }
	}

}
