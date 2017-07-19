class Action extends Node{

	init(node){
		super.init(node);
		this.type="action";
		this.target = null;
		this.act = null;
		this.value = null;

		if(node.target!=null){
			this.target = node.target;
		}
		if(node.act!=null){
			this.act = node.act;
		}
		if(node.value!=null){
			this.value = node.value;
		}
		
	}

	setChildren(node){
		this.children = null;
	}

	add(node){
		return false;
	}


	wait(target,value){
		return true;
	}

	run(){
		return this.agent.act(this.act,this.value);
	}

}
