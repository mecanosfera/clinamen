class Entity {

  constructor(args){
    this.init(args);
  }

  init(args){
    this.UUID;
    this.name = "";
    this.type="entity";
    this.state = {};
    this.children = [];

    if(args!=null){
      if(args.UUID!=null){
  			this.UUID = args.UUID;
  		}
      if(args.name!=null){
  			this.name = args.name;
  		}
      if(args.state!=null){
        this.state = args.state;
      }
    }
  }

  update(){}

  toJson(){
    var js = {
			UUID: this.UUID,
			type: this.type,
			name: this.name,
			state: JSON.stringigy(this.state),
			children: []
		}
		for(let c of this.children){
			js.children.push(c.toJson());
		}
  }
}
