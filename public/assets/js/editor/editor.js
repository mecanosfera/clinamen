class Editor {

  constructor(args){
    this.init(args);
  }

  init(worlds){
    this.worlds = worlds;
    for(let w of mundos_aula){
      this.worlds.push(w);
    }
    this.world = null;
    this.template = null;
    this.agent = null;
    this.behavior = null;
    this.ui = new EditorUI(this);
  }

  start(){}

  select(entity){
    console.log(entity);
    if(entity.type=="world"){
      this.world = new World(entity);
      this.world.start();
    } else if (entity.type=="agent"){
      this.template = entity;
    } else  {
      //console.log(entity);
      this.behavior = NodeConstructor(entity);
    }
  }

  edit(entity,type){
    if(type=="world"){
      this.world = entity;
      /*if(entity==null){
        this.world = new World(teste1);
      }*/
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



  update(entity,state,oldState,value){
    if(entity.type=="agent"){
      if(entity instanceof Agent){

      } else {
        if(state=="name"){
          this.template.name = value;
        } else {
          if(value==null){
            delete this.template[oldState];
          } else {
            if(state!=oldState){
              delete this.template[oldState];
            }
            if(value=="null"){
              this.template.state[state] = null;
            } else if (value=="false"){
              this.template.state[state] = false;
            } else if (value=="true"){
              this.template.state[state] = true;
            } else if (value.search('"')>-1){
              this.template.state[state] = value;
            } else {
              this.templtate.state[state] = parseInt(value);
            }
          }
        }
      }
    } else if (entity.type=="world"){

    } else {
      if(entity instanceof Selector){

      }
    }
    this.save();
  }

  save(){
    if(this.world!=null){

    }
  }


}
