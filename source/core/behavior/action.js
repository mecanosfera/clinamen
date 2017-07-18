class Action extends Node{

	init(node){
		super.init(node);
		this.type="action";
		this.target = null;
		this.condition = null;
		this.act = null;

		if(node.target!=null){
			this.target = node.target;
		}
		if(node.condition!=null){
			this.condition = node.condition;
		}
		if(node.act!=null){
			this.act = node.act;
		}
	}

	setChildren(node){
		this.children = null;
	}

	add(node){
		return false;
	}

	run(){
		//alert(this.act);
		if(this.testCondition()){
			return this.agent.act(this.act,this.target,this.condition);
		}
		return false; 
	}

}
