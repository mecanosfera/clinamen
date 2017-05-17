class Action extends Node{

	init(args){
		super.init();

		if(args[0] instanceof Agent){
			this.agent = args[0];
			this.target = args[1];
			this.condition = args[2];
			this.task = args[3];
		} else {
			this.load(args);
		}
	}

	run(){
		return this.agent.act(this.task,this.target,this.condition);
	}


}
