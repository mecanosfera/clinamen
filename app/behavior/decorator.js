class Decorator extends Behavior{

	init(args){
		super.init(args);
		this.type = 'decorator';
		this.result = args.result || null;
	}

	setChildren(behavior){
		if(behavior.child!=null){
			this.add(behavior.child);
		} else {
			this.child = null;
		}
	}

	setAgent(agent){
		if(agent!=null){
			this.agent = agent;
			if(this.child!=null){
				this.child.setAgent(agent);
			}
		}
	}

	add(behavior){
		var child = behavior;
		if(!(behavior instanceof Behavior)){
			child = behaviorConstructor(behavior);
		}
		child.setAgent(this.agent);
		this.child = child;
	}

	//arrumar
	traverse(obj){
		var k = obj.keys();
		if(obj[k[0]] instanceof Object && !(obj[k[0]] instanceof Array)){
			return this.traverse(obj[k[0]]);
		}
		return obj[k[0]];
	}

	toJson(){
		var js = super.toJson();
		js.child = this.child.toJson();
		return js;
	}

}


class Inverter extends Decorator{

	init(args){
		super.init(args);
		this.type="inverter";
	}

	run(iterator=false){
		if(this.child==null){
			return false;
		}
		return !this.child.run(iterator);
	}

}

//----------------------------------------

class Limit extends Decorator{

	init(args){
		super.init(args);
		this.type= 'limit';
		this.max = node.max || 0;
		this.runs = 0;
	}

	run(iterator=false){
		if(this.child==null){
			return false;
		}
		if(this.runs>=this.max){
			return false;
		}
		this.runs++;
		return this.child.run(iterator);
	}

	toJson(){
		var js = super.toJson();
		js.max = this.max;
		js.runs = this.runs;
		return js;
	}

}


class Find extends Decorator{

		init(args){
			super.init(args);
			this.type="find";
			this.filter = args.filter || {};
			this.scope = args.scope || 'world';
		}

		run(iterator=false){
			if(this.temp){
				this.res = {};
			}
			var res = null;
			if(this.scope=='world'){
				res = this.agent.world.find(this.filter);
			} else {
				res = this.agent.find(this.filter);
			}
			if(this.result!=null){
				this.agent.res[this.result] = res;
			}
			if(res!=null){
				return true;
			}
			return false;

		}

		toJson(){
			var js = super.toJson();
			js.filter = JSON.stringify(this.filter);
			js.scope = this.scope;
			js.result = JSON.stringify(this.result);
			return js;
		}

}

class Test extends Decorator{

	init(args){
		super.init(args);
		this.type = 'test';
		this.filter = args.filter;
	}

	/*{
		res:teste,
		op:'>',
		value:{res:{celula:{prop:vivo}}}}
		*/
	run(iterator=false){



		if(op[this.op](this.agent.prop[this.propName],this.propValue)){
			return this.child.run(iterator);
		}
		return false;
	}

	toJson(){
		var js = super.toJson();
		js.propName = this.propName;
		js.op = this.op;
		js.propValue = this.propValue;
		return js;
	}

}


class Count extends Decorator{

	init(args){
		super.init(args);
		this.type = "count";
		this.target = args.target || 'self';
		this.filter = args.filter;
	}

	run(iterator=false){
		if(this.agent.temp && this.result!=null){
			this.agent.res[this.resault] = null;
		}
		var target = this.agent;
		if(this.target!='self'){
			//{prop:val}
			var tk = this.target.keys();
			if(this.agent[tk[0]][this.target[tk[0]]]!=null){
				target = this.agent[tk[0]][this.target[tk[0]]];
			}
			return false;
		}
		var k = this.filter.keys();
		var c = null;
		if(target[k[0]][this.filter[k[0]]]!=null){
			c = target[k[0]][this.filter[k[0]]].length;
		}
		if(this.result!=null){
			this.agent.res[this.result] = c;
		}
		if(c!=null){
			return true;
		}
		return false;
	}


}


//--------------------------------------------------
