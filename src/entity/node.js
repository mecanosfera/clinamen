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
