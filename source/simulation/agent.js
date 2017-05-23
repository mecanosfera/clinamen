class Agent extends IAgent{

	init(args){
		super.init(args);
		this.type="agent";
		this.world;
		this.tree;
		this.position;
		this.color = "#000000";
		this.sprite;
		this.prop = {}


		if(args.world!=null){
			this.world = args.world;
		}
		if(args.sprite!=null){
			this.sprite=args.sprite;
		}
		if(args.color!=null){
			this.color = args.color;
		}
		if(args.tree!=null){
			this.addTree(args.tree);
		}
		if(args.prop!=null){
			this.prop = args.prop;
		}

	}

	addTree(tree){
		this.tree = tree;
		tree.setAgent(this);
	}

	distance(agent){
		return 1;
	}

	findAgent(type,filter){
		if(this.world.has(type)){
			if(filter instanceof String){
				if(filter=="nearest"){
					var dist = 999999;
					var nearest = null;
					for(a in this.world.agents[type]){
						if(this.distance(a)<dist){
							nearest = a;
						}
					}
					return nearest;
				}//filters
			} else if (filter instanceof Array){

			}
		}
		return null;
	}

	act(action,target,condition){
		if(this[action]){
			return this[action](target,condition);
		}
		return false;
	}

	wait(){
		return true;
	}

	teste(){
		alert("xxxx");
		return true;
	}

	heal(){
		alert("heal");
		if(this.hp<35){
			this.hp = 35;
			return true;
		}
		alert("heal false");
		return false;
	}

	toJson(){

	}


}
