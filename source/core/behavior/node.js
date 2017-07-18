class Node extends Entity{

	init(node){
		super.init(node);
		this.type="node";
		this.agent = null;
		this.children = [];
		this.condition = null;

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

	testCondition(){
		if(condition!=null){
			return true;
		}
		return true;
	}

	run(){
		return false;
	}

	toJson(){
		var js = {
			UUID: this.UUID,
			type: this.type,
			name: this.name,
			agent: this.agent.toJson(),
			children: []
		}
		for(let c of this.children){
			js.children.push(c.toJson());
		}
		return js;
	}

	toChart(){
		var js = {
			text: {name: this.type},
			children:[]
		};
		if(this.children!=null){
			for(let c of this.children){
				js.children.push(c.toChart());
			}
		}
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
