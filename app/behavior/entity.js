class Entity {

  constructor(args={}){
    this.init(args);
  }

  init(args){
    this.name = args.name || null;
    this.type ='entity';
    this.prop = args.prop || {};
    this.res = {};
    this.temp = args.temp || true;
    this.children = [];
  }

  run(iterator=false){
    return false;
  }

  toJson(){
    var js = {
			type: this.type,
			name: this.name,
			prop: JSON.stringify(this.prop),
			children: []
		}
		for(let c of this.children){
			js.children.push(c.toJson());
		}
    return js;
  }

}
