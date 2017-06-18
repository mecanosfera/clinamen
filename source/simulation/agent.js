class Agent extends IAgent{

	init(args){
		super.init(args);
		this.type="agent";
		this.template;
		this.world;
		this.tree;
		this.position = [-1,-1];
		this.color = "#000000";
		this.sprite;

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
			this.add(args.tree);
		}
		if(args.template!=null){
			this.template = args.template;
		} else {
			this.template = this.type;
		}
		if(args.position!=null){
			this.position = args.position;
		}

	}

	add(tree){
		if(tree instanceof Node){
			this.tree = tree;
		} else {
			this.tree = NodeConstructor(tree);
		}
		this.tree.setAgent(this);
	}

	distance(agent){
		if(agent.position!=null){
			return Math.sqrt((this.position[0]-agent.position[0])+(this.position[1]-agent.position[1]));
		}
		return -1;
	}


	search(type,filter){
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
				} else if (filter=="farthest"){
					var dist = 0;
					var far = null;
					for(a in this.world.agents[type]){
						if(this.distance(a)>dist){
							far = a;
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



	toJson(){

	}


}
