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
		this.nextPosition = null;
		this.cap = {
			"distance" : this.distance
		}

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

	distance(target,origin=null){
		if(origin==null){
			origin = this.position;
		}
		if(target!=null){
			return Math.sqrt((origin[0]-target[0])+(origin[1]-target[1]));
		}
		return -1;
	}

	neighbors(){
		if(this.position!=null){
			var p0 = this.position[0];
			var p1 = this.position[1];
			return [[p0-1,p1],[p0-1,p1+1],[p0,p1+1],[p0+1,p1+1],[p0+1,p1],[p0+1,p1-1],[p0,p1-1],[p0-1,p1-1]];
		}
		return [];
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

	move(target){
		var p = target;
		var viz = this.neighbors();
		if(target instanceof Agent){
			if(target.position!=null){
				p = target.position;
			} else {
				this.nextPosition = null;
				return false;
			}
		} else if (target instanceof String){

		} else if (target Number.isInteger(target)){
			viz = [viz[target]];
		}
		var dist = 9999;
		var pos = this.position;
		for(n of viz){
			var d = this.distance(p,n);
			if(d<dist){
				if(this.world.get(n)==null){
					dist = d;
					pos = n;
				}
			}
		}
		if(pos==this.position){
			this.nextPosition = this.position;
			return false;
		} else {
			this.nextPosition = pos;
			return true;
		}
		return false;
	}

	transition(v,all=true){
		if(all){
			for(let p in v){
				if(this.prop[p]=null){
					return false;
				}
			}
			for(let p in v){
				this.prop[p] = v[p];
			}
		} else {
			for(let p in v){
				if(this.prop[p]!=null){
					this.prop[p] = v[p];
				}
			}
		}
	}


	affect(){}


	toJson(){

	}


}
