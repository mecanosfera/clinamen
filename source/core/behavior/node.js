class Node extends Entity{

	init(node){
		super.init(node);
		this.type="node";
		this.agent = null;
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
			c = new getClass(node.type)(node);
		}
		c.setAgent(this.agent);
		this.children.push(c);
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

}


class Selector extends Node{

	init(node){
		super.init(node);
		this.type="selector";
	}

	run(){
		for(let c of this.children){
			if(c.run()){
				return true;
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
		for(let c of this.children){
			if(!c.run()){
				return false;
			}
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
		var rchildren = shuffle(this.children);
		for(let c of rchildren){
			if(c.run()){
				return true;
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
		var rchildren = shuffle(this.children);
		for(let c of rchildren){
			if(!c.run()){
				return false;
			}
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
