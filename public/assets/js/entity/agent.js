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
			for(let s in args.state){
				this.state[s] = args.state[s];
			}
			//this.state = args.state;
		}
		if(args.template!=null){
			this.template = args.template;
		} else {
			this.template = this.type;
		}
		if(args.position!=null){
			this.position = args.position;
		}
		if(args.children!=null){
			//alert(args.children[0].type);
			for(let c of args.children){
				//alert(c.type);
				this.add(c);
			}
		}


	}

	add(behavior){
		//alert(behavior);
		if(behavior instanceof Node){
			this.children.push(behavior);
		} else {
			this.children.push(NodeConstructor(behavior));
		}
		//alert(this.children.length);
		//alert(this.children[0] instanceof Action);
		//alert(this.children[0].type);
		this.children[0].setAgent(this);
	}



	neighbors(){
		var n = [];
		if(this.position!=null){
			var p0 = this.position[0];
			var p1 = this.position[1];
			n = [
				[p0-1,p1], //left
				[p0-1,p1+1], //bottomleft
				[p0,p1+1], //bottom
				[p0+1,p1+1], //bottomright
				[p0+1,p1], //right
				[p0+1,p1-1], //topright
				[p0,p1-1], //top
				[p0-1,p1-1] //topleft
			];
			for(let p of n){
				if(p[0]<0){
					p[0] = this.world.size[0]-1;
				} else if(p[0]>=this.world.size[0]){
					p[0] = 0;
				}
				if(p[1]<0){
					p[1] = this.world.size[1]-1;
				} else if(p[1]>=this.world.size[1]){
					p[1] = 0;
				}
			}
		}
		return n;
	}

	act(action,value){
		if(this[action]){
			return this[action](value);
		}
		return false;
	}

	wait(){
		return true;
	}

	move(target){
		var p = [];
		var n = this.neighbors();
		if(target=="random"){
			p = n[Math.floor(Math.random() * 7)];
		} else {
			if(target=="left"){
				p = n[0];
			} else if (target=="bottomleft"){
				p= n[1];
			} else if (target=="bottom"){
				p= n[2];
			} else if (target=="bottomright"){
				p= n[3];
			} else if (target=="right"){
				p= n[4];
			} else if (target=="topright"){
				p= n[5];
			} else if (target=="top"){
				p= n[6];
			} else if (target=="topleft"){
				p= n[7];
			}
		}

		if(this.world.positions[p[0]][p[1]]==null){
			for(let a of this.world.children){
				if(a.nextPosition==p){
					return false;
				}
			}
			this.nextPosition = p;
			return true;
		}
		return false;
	}

	change(state){
		this.nextState = {};
		for(let s in state){
			if(this.state[s]!=null){
				if(state[s] instanceof Array){
					if(state[s][0]=="+"){
						this.nextState[s] = this.state[s]+state[s][1];
					} else {
						this.nextState[s] = this.state[s]-state[s][1];
					}
				} else {
					this.nextState[s] = state[s];
				}
			}
		}
		return true;

	}

	affect(){}

	run(){
		if(this.children.length>0){
			return this.children[0].run();
		}
		return false;
	}

	toJson(){
		var js = super.toJson();
		js.template = this.template;
		js.position = this.position;
		return js;
	}


}
