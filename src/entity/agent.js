class Agent extends Entity{

	init(args){
		super.init(args);
		this.type="agent";
		this.template;
		this.world;
		this.children;
		this.position = [-1,-1];
		this.nextPosition = null;
		this.lastPosition = null;
		this.nextState = null;
		this.state = {
			color: '#000',
			sprite: null
		};

		if(args.world!=null){
			this.world = args.world;
		}
		if(args.state!=null){
			this.state = args.state;
		}
		if(args.children!=null){
			this.children = args.children;
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

	add(behavior){
		if(behavior instanceof Node){
			this.behavior = behavior;
		} else {
			this.behavior = NodeConstructor(behavior);
		}
		this.behavior.setAgent(this);
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

		} else if (Number.isInteger(target)){
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
		var js = super.toJson();
		js.template = this.template;
		js.position = this.position;
		return js;
	}


}
