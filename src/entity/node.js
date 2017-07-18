class Node extends Entity{

	init(node){
		super.init(node);
		this.type="node";
		this.agent = null;
		this.condition = null;
		this.children = [];

		if(node.agent!=null){
			this.agent = node.agent;
		}

		this.setChildren(node);
	}

	setChildren(node){
		if(node.children!=null && node.children.length>0){
			for(let c of node.children){
				this.add(c);
			}
		}
	}

	setAgent(agent){
		if(agent!=null){
			this.agent = agent;
			if(this.children!=null){
				for(let c of this.children){
					c.setAgent(agent);
				}
			}
		}
	}

	add(node){
		var c = node;
		if(!(node instanceof Node)){
			c = NodeConstructor(node);
		}
		c.setAgent(this.agent);
		this.children.push(c);
	}


	getAgent(def){
		if(def.target!=null){
			if(def.target=="self"){
				return this.agent;
			}
		} else {
			var ags = [];
			if(def.template!=null){
				ags = this.agent.world.getAgent(def.template);
			}
		}

	}


	search(type,filter,ag){
		if(type=="distance"){

		}
	}




	parseCondition(condition){
		var precond = null;
		var cond = {};
		var str = condition.split("/");
		if(str.length>1){
			var c = str.split("|");
			if(c.length>1){
				cond.filter = str[1];
			}
			cond.type = str[0];
		}

		if(condition.search("/")>-1){

		}
		if(condition instanceof String){

		}
	}

	testCondition(condition){
		if(condition!=null){
			var c1;
			var c2;
			if(condition[1] =="and"){
				c1 = this.testCondition(condition[0]);
				c2 = this.testCondition(condition[2]);
				return c1 && c2
			} else if (condition[1]=="or"){
				c1 = this.testCondition(condition[0]);
				c2 = this.testCondition(condition[2]);
				return c1 || c2
			} else {
				c1 = this.parseCondition(condition[0]);
				c2 = condition[2];
				return op[condition[1]](c1,c2);
			}
			return false;
		}
		return true;
	}

	run(){
		return false;
	}

	toJson(){
		var js = super.toJson();
		js.condition = JSON.stringify(this.condition);
		return js;
	}

}


class Selector extends Node{

	init(node){
		super.init(node);
		this.type="selector";
	}

	run(){
		if(this.testCondition()){
			for(let c of this.children){
				if(c.run()){
					return true;
				}
			}
		}
		return false;
	}

}


class Sequence extends Node{

	init(node){
		super.init(node);
		this.type="sequence";
	}

	run(){
		if(this.testCondition()){
			for(let c of this.children){
				if(!c.run()){
					return false;
				}
			}
		} else {
			return false;
		}
		return true;
	}

}


class RandomSelector extends Node {

	init(node){
		super.init(node);
		this.type="randomSelector";
	}

	run(){
		if(this.testCondition()){
			var rchildren = shuffle(this.children);
			for(let c of rchildren){
				if(c.run()){
					return true;
				}
			}
		}
		return false;
	}

}

class RandomSequence extends Node {

	init(node){
		super.init(node);
		this.type="randomSequence";
	}

	run(){
		if(this.testCondition()){
			var rchildren = shuffle(this.children);
			for(let c of rchildren){
				if(!c.run()){
					return false;
				}
			}
		} else {
			return false;
		}
		return true;
	}

}



	/*
		{
			UUID: 1231232132131,
			type: "selector",
			name: "teste",
			children:[
				{
					UUID:26372472134,
					type: "action",
					name: "wait",
					agent: "self",
					target: null,
					condition: null,
					task: null
				},
				{
					UUID: 21634214215634
					type: "inverter",
					name: null,
					child: {
						UUID: 763432453264,
						type: "selector",
						name: null,
						children:[]
					}
				}
			]
		}
	*/
