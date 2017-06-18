class Editor {

  constructor(args){
    this.init(args);
  }

  init(args){
    this.worlds = [];
    this.agents = [];
    this.behaviors = [];
    this.simulation = null;
    this.selectedPosition = [-1,-1];

    this.world;
    this.agent;
    this.tree;

    if(args.worlds!=null){
      this.worlds = args.worlds;
    }
    if(args.simulation!=null){
      this.simulation = args.simulation;
    }
    this.open = [];
  }

  start(){}

  select(){}

  edit(entity,type){
    if(type=="world"){
      this.world = entity;
      if(entity==null){
        this.world = new World(teste1);
      }
    } else if (type=="agent"){
      this.agent = entity;

      if(entity==null){
        this.agent = new Agent({});
      }
    } else if (type=="empty_cell") {
      this.agent = null;
      this.selectedPosition = entity;
    } else {
      this.tree = entity;
    }
  }

  generateTreeConfig(node){
    var chart_config = {
      chart: {
        container: '#editor_tree_edit'
      },
      nodeStructure: node.toChart()
    }
    return chart_config;
  }



  update(entity){}
}


var teste1 = {
	UUID: 34354446546546,
	type: "world",
	name: "teste1",
	size: [20,20],
	generation: 0,
	agents: [
		{
			UUID: 454554654645654,
			name: "um",
			position: [10,15],
			prop: {
				hp: 35
			},
			tree: {
				type: "selector",
				children: [
          {
  					type: "condition",
  					condition: ["==",{target:"self",prop:"hp"},25],
  					child: {
  						type: "selector",
  						children: [
  							{
  								type: "action",
  								act: "move",
  								target: "enemy",
  								condition: "nearest"
  							},
  							{
  								type: "action",
  								act: "wait",
  								target: "self"
  							}
  						]
  					}
          },
          {
  					type: "condition",
            name: "teste",
  					condition: ["!=",{target:"self",prop:"hp"},25],
  					child: {
  						type: "selector",
  						children: [
  							{
  								type: "action",
  								act: "move",
  								target: "enemy",
  								condition: "nearest"
  							},
  							{
  								type: "action",
  								act: "wait",
  								target: "self"
  							}
  						]
  					}
          }
				]
			}
		}
	]
}
