class Decorator extends Node{

	init(node){
		super.init(node);
		this.type="decorator";
	}

	setChildren(node){
		if(node.child!=null){
			this.add(node.child);
		} else {
			this.child = null;
		}
	}

	setAgent(agent){
		if(agent!=null){
			this.agent = agent;
			if(this.child!=null){
				this.child.setAgent(agent);
			}
		}
	}

	add(node){
		var c = node;
		if(!(node instanceof Node)){
			c = NodeConstructor(node);
		}
		c.setAgent(this.agent);
		this.child = c;
	}

	toChart(){
		var js = {
			text: {name: this.type},
			children:[this.child.toChart()]
		}
		return js;
	}

}


class Inverter extends Decorator{

	init(node){
		super.init(node);
		this.type="inverter";
	}

	run(){
		if(this.child==null){
			return false;
		}
		return !this.child.run();
	}

}

//----------------------------------------

class Limit extends Decorator{

	init(node){
		super.init(node);
		this.max = node.max;
		this.runs = 0;
		this.type="limit";
	}

	run(){
		if(this.child==null){
			return false;
		}
		if(this.runs>=this.max){
			return false;
		}
		this.runs++;
		return this.child.run();
	}

}


class Find extends Decorator{

		init(node){
			super.init(node);
			this.type="find";
			this.template = node.template;
		}

		run(){
			var n = this.agent.neighbors();
			for(let a of n){
				var ag = this.agent.world.get(a);
				if(ag!=null){
					if(ag.template==this.template){
						return this.child.run();
					}
				}
			}
			return false;
		}

}

class Test extends Decorator{

	init(node){
		super.init(node);
		this.type="test";
		this.state = node.state;
		this.op = node.op;
		this.value = node.value;
	}


	run(){
		if(this.agent.state.vivo==1){
			//console.log(this.agent.name+": "+this.agent.state[this.state]+" - "+this.value);
		}
		if(op[this.op](this.agent.state[this.state],this.value)){
			//console.log('xxx');
			return this.child.run();
		}
		return false;
	}
}


class Count extends Decorator{

	init(node){
		super.init(node);
		this.type="count";
		this.template = null;
		this.state = null;
		this.opState = null;
		this.stateValue = null;
		this.op = null;
		this.value = null;
		if(node.template!=null){
			this.template = node.template;
		}
		if(node.state!=null){
			this.state = node.state;
		}
		if(node.opState!=null){
			this.opState = node.opState;
		}
		if(node.stateValue!=null){
			this.stateValue = node.stateValue;
		}
		if(node.op!=null){
			this.op = node.op;
		}
		if(node.value!=null){
			this.value = node.value;
		}
	}

	run(){

		var n = this.agent.neighbors();
		var agents = [];
		for(let a of n){
			var r = this.agent.world.get(a);
			if(r!=null){
				agents.push(r);
			}
		}
		var end1 = [];
		var end2 = [];
		if(this.template!=null){
			for(let a of agents){
				if(a.template==this.template){
					end1.push(a);
				}
			}
		} else {
			end1 = agents;
		}
		if(this.state!=null){
			for(let a of end1){
				if(op[this.opState](a.state[this.state],this.stateValue)){
					end2.push(a);
				}
			}
		} else {
			end2 = end1;
		}
		if(op[this.op](end2.length,this.value)){
			return this.child.run();
		}
		return false;
	}


}


//--------------------------------------------------
