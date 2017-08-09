class Agent extends Entity{

	init(args){
		super.init(args);
		this.type="agent";
		this.template = args.template || this.type;
		this.world = args.world || null;
		this.result = {};


		if(args.state!=null){
			for(let s in args.state){
				this.state[s] = args.state[s];
			}
		}

		if(args.children!=null){
			for(let c of args.children){
				this.add(c);
			}
		}


	}

	add(behavior){
		if(behavior instanceof Behavior){
			this.children.push(behavior);
		} else {
			this.children.push(BehaviorConstructor(behavior));
		}
		this.children[0].setAgent(this);
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


	run(iterator=false){
		if(this.children.length>0){
			return this.children[0].run(iterator);
		}
		return false;
	}

	toJson(){
		var js = super.toJson();
		js.template = this.template;
		return js;
	}


}
