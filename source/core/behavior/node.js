class Node {
	
	constructor(...args){
		this.init(args);
	}
	
	init(args){
		this.UUID = UUIDGenerator();
		this.children = [];
		if(args!=null){
			for(a in args){
				if(a instanceof Node){
					this.children.push(a)
				} else {
					this.load(a);
				}
			}
		}
	}
	
	run(){
		return true;
	}
	
	load(node){
		
	}
	
	
}


class Selector extends Node{
	
	run(){
		for(c in this.children){
			if(c.run()){
				return true;
			}
		}
		return false;
	}
}


class Sequence extends Node{
	
	run(){
		for(c in this.children){
			if(!c.run()){
				return false;
			}
		}
		return true;
	}
}


class RandomSelector extends Node {
	
	run(){
		var rchildren = shuffle(this.children);
		for(c in rchildren){
			if(c.run()){
				return true;
			}
		}
		return false;
		
	}
}

class RandomSequence extends Node {
	
	run(){
		var rchildren = shuffle(this.children);
		for(c in rchildren){
			if(!c.run()){
				return false;
			}
		}
		return true;
	}
	
}
