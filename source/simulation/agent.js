class Agent extends IAgent{

	constructor(...args){
		this.init(args);
	}

	init(args){
		this.tree;
		this.position;
	}

	act(action,target,condition){
		if(this[action]){
			this[action](target,condition);
		}
		return false;
	}

	wait(){
		return true;
	}


}
