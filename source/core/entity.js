class Entity {

  constructor(args){
    this.init(args);
  }

  init(args){
    this.UUID;
    this.name = "";
    this.type="entity";
    this.state = {};

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

  toJson(){}
}
