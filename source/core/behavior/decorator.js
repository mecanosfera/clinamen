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
			c = new (getClass(node.type))(node);
		}
		c.setAgent(this.agent);
		this.child = c;
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

//--------------------------------------------------

class Condition extends Decorator{

	init(node){
		super.init(node);
		this.condition = node.condition;
		this.type="condition";
	}

	run(){
		if(this.child==null){
			return false;
		}
		if(this.testCondition()){
			return this.child.run();
		}
		return false;
	}

	testCondition(){
		var oper = op[this.condition[0]];
		var a = this.condition[1];
		var b = this.condition[2];
		var a_val = a;
		var b_val = b;

		if(a instanceof Object){
			if(a.type=="self"){
				if(!this.agent.attr[[a.prop]]){
					return false;
				} else {
					a_val = this.agent.attr[[a.prop]];
				}
			} else {
				var ag = this.agent.findAgent(a.type,[a.cap]);
				if(ag!=null){
					if(!ag.attr[[a.prop]]){
						return false;
					} else {
						a_val = ag.attr[[a.prop]];
					}
				} else {
					return false;
				}
			}
		}
		if(b instanceof Object){
			if(b.type=="self"){
				if(!this.agent.attr[[b.prop]]){
					return false;
				} else {
					b_val = this.agent.attr[[b.prop]];
				}
			} else {
				var ag = this.agent.findAgent(b.type,[b.cap]);
				if(ag!=null){
					if(!ag.attr[[b.prop]]){
						return false;
					} else {
						b_val = ag.attr[[b.prop]];
					}
				} else {
					return false;
				}
			}
		}
		return oper(a_val,b_val);
	}
}




/*
["==",{type:"self",prop:"hp"},56]
["==",{type:"enemy",cap:"nearest",attr:"hp"},10]


*/
	//["==",5,6]
	//[">=",[self,hp],35]
	//["==",nearest,enemy]
	//
