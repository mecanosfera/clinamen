class Decorator extends Node{

	init(args){
		this.child=null;
		if(args[0] instanceof Node){
			this.child = args[0];
		} else {
			this.load(args);
		}

	}

}


class Inverter extends Decorator{

	run(){
		return !this.child.run();
	}
}

class Limit extends Decorator{

	init(runLimit, args){
		super.init(args);
		this.runLimit = runLimit;
		this.runSoFar = 0;
	}

	run(){
		if(this.runSoFar>=this.runLimit){
			return false;
		}
		this.runSoFar++;

		return this.child.run();
	}

}


class Condition extends Decorator{

	init(...args){
		super.init(args[1],args[0]);
		this.condition = args[0];
		//{op:"==",obj1:[self,hp],obj2:[enemy,hp]}
	}

	run(){
		if(this.testCondition()){
			return this.child.run();
		}
		return false;
	}

	testCondition(){
		return op[this.condition["op"]](objects[this.condition["obj1"][0]][this.condition["obj1"][1]],objects[this.condition["obj2"][0]][this.condition["obj2"][1]]))
		//return false;
	}
}
