class Grid {

  constructor(ui,grid,size){
    this.ui = ui;
    this.zoom = ui.zoom;
		this.canvas = document.getElementById(grid);
    this.size = null;
    if(size!=null){
      this.size = {X:size[0],Y:size[1]}
      this.canvas.width = this.size.X*20;
  		this.canvas.height = this.size.Y*20;
    }
		this.cxt = this.canvas.getContext('2d');
		this.tamanhoCelula = 20;
		this.updating = false;
    $(this.canvas).click(this,function(evt){
      var x = parseInt(evt.offsetX/evt.data.tamanhoCelula);
      var y = parseInt(evt.offsetY/evt.data.tamanhoCelula);
      //alert(evt.data.ui.editor.world.positions[13][15]);
      //alert(x+","+y+": "+evt.data.ui.editor.world.positions[x][y]);
      var ag = evt.data.ui.editor.world.positions[x][y];
      if(ag!=null){
        evt.data.ui.editor.edit(ag,"agent");
        evt.data.ui.edit("agent");
      } else {
        evt.data.ui.editor.edit([x,y],"empty_cell");
        evt.data.ui.edit("empty_cell");
      }
    });
  }

  setSize(size){
    this.size = {X:size[0],Y:size[1]}
    this.canvas.width = this.size.X*20;
		this.canvas.height = this.size.Y*20;
  }

  draw(world){
    for(let x=0;x<this.size.X;x++){
      for(let y=0;y<this.size.Y;y++){
          this.cxt.strokeStyle='#666';
          this.cxt.fillStyle='#ffffff';
          this.cxt.fillRect(x*this.tamanhoCelula,y*this.tamanhoCelula,this.tamanhoCelula,this.tamanhoCelula);
    			this.cxt.strokeRect((x*this.tamanhoCelula),(y*this.tamanhoCelula),this.tamanhoCelula,this.tamanhoCelula);
      }
    }
    if(world!=null){
      for(let a of world.children){
        this.cxt.fillStyle = a.state.color;
        if(a.state.sprite!=null){

        } else {
          this.cxt.fillRect(a.position[0]*this.tamanhoCelula,a.position[1]*this.tamanhoCelula,this.tamanhoCelula,this.tamanhoCelula);
          this.cxt.strokeRect((a.position[0]*this.tamanhoCelula),(a.position[1]*this.tamanhoCelula),this.tamanhoCelula,this.tamanhoCelula);
        }
      }
    }


	}

}


class EntityMenu {

  constructor(args){
    this.init(args);
  }

  init(args){
    this.editorUI = args;
    this.el = $("#library_list");
    this.selected = {
      element: this.el,
      entity: null
    };
    this.paper = Raphael(0,0,2000,2000);
  }

  add(entity,parent){
    var prnt = this.el;
    if(parent!=null){
      prnt = parent;
    }
    var li = $('<li class="'+entity.type+'"></li>');
    var name = entity.name;
    if(name==null || name==""){
      name = entity.type;
    }
    var icon = $('<span class="icon_entity '+entity.type+'"></span>');
    var ent = $('<a href="#" class="item_entity '+entity.type+'">'+name+'</a>');
    var ul = $('<ul class="item_entity_children '+entity.type+'"></ul>');
    icon.click(function(){
      ul.toggle();
    });
    ent.click(this,function(evt){
      evt.data.select([entity,li]);
    });
    ent.dblclick(this,function(evt){
      evt.data.editorUI.editor.edit(entity);
      evt.data.editorUI.edit(entity.type);
    });

    if(entity instanceof Decorator){
        this.add(entity.child,ul);
    } else if (entity instanceof Action){

    } else if (entity instanceof Node){
        for(let c of entity.children){
          this.add(c,ul);
        }
    } else if (entity instanceof Agent){
        if(entity.tree !=null){
          this.add(entity.tree,ul);
        }
    } else if (entity instanceof World){
        if(entity.started){
          for(let a of entity.agents){
            this.add(a,ul);
          }
        } else {
          for(let tp in entity.templates){
            this.add(entity.templates[tp].agent,ul);
          }
        }
    }

    li.append(icon);
    li.append(ent);
    li.append(ul);
    prnt.append(li);
  }

  select(ents){

  }

}


class NodeUI {

  constructor(node,parent,world,line){
    this.init(node,parent,world,line);
  }

  init(node,parent,world,line=null){
    this.node = node;
    this.prnt = parent;
    this.li = $('<li class="node '+node.type+'"></li>');
    this.nav = $('<nav class="node_menu '+node.type+'"></nav>');
    this.h3 = $('<h3 class="icon '+node.type+'"></h3>');
    this.btEdit = $('<a href="#" class="button edit"></a>');
    this.btConfirm = $('<a href="#" class="button confirm"></a>');
    this.btCancel = $('<a href="#" class="button cancel"></a>');
    this.btDelete = $('<a href="#" class="button delete"></a>');
    this.btAdd = $('<a href="#" class="button add"></a>');
    this.label = $('<label>'+node.type+'</label>');
    this.ul = $('<ul></ul>');
    this.editArea = $('<div class="edit_area"></div>');
    this.sectionName = $('<section class="section name '+node.type+'"></section>');
    this.nameSpan =  $('<span class="name_empty">Nome</span>');
    this.nameInput = $('<input type="text" class="name_field" value="" />');
    this.nav.append(this.h3);
    this.nav.append(this.btEdit);
    this.nav.append(this.btConfirm);
    this.nav.append(this.btCancel);
    this.nav.append(this.btDelete);
    this.nav.append(this.btAdd);
    this.nav.append(this.editArea);
    this.sectionName.append(this.nameSpan);
    this.sectionName.append(this.nameInput);
    this.editArea.append(this.sectionName);
    this.li.append(this.nav);
    this.li.append(this.label);
    this.li.append(this.ul);
    this.prnt.append(this.li);
    this.children = [];
    this.line = line;
    this.world = world;
    //alert('aaaaa');

    var nav = this.nav;

    this.h3.click(function(){
      if(nav.hasClass("selected") && !nav.hasClass("edit_mode")){
        nav.removeClass("selected");
      } else {
        nav.addClass("selected");
      }
    });

    this.btEdit.click(function(){
      if(nav.hasClass("edit_mode")){
        nav.removeClass("edit_mode");
      } else {
        nav.addClass("edit_mode");
      }
    });

    this.btConfirm.click(function(){

    });

    this.btCancel.click(function(){

    });

    if(node instanceof Decorator){
      if(node instanceof Condition){
        this.sectionCondition1 = $('<section class="section condition1"></section>');
        this.inputConditionValue1 = $('<input type="text" value="" />');
        if(this.node.condition!=null && this.node.condition[1]!=null){
          if(this.node.condition[1] instanceof Object){
            this.inputConditionValue1.val(this.node.condition[1].stringify());
          } else {
            this.inputConditionValue1.val(this.node.condition[1]);
          }
        }
        this.sectionCondition1.append(this.inputConditionValue1);

        this.sectionConditionOperator = $('<section class="section operator"></section>');
        this.selectConditionOperator = $('<select></select>');
        if(this.node.condition!=null && this.node.condition[2]!=null){

        this.sectionConditionOperator.append(this.selectConditionOperator);

        this.sectionCondition2 = $('<section class="section condition2"></section>');
        this.inputConditionValue2 = $('<input type="text" value="" />');
        if(this.node.condition!=null && this.node.condition[2]!=null){
          if(this.node.condition[2] instanceof Object){
            this.inputConditionValue1.val(this.node.condition[2].stringify());
          } else {
            this.inputConditionValue1.val(this.node.condition[2]);
          }
        }
        this.sectionCondition2.append(this.inputConditionValue2);

        this.editArea.append(this.sectionCondition1);
        this.editArea.append(this.sectionConditionOperator);
        this.editArea.append(this.sectionCondition2);

        if(this.node.child!=null){
          this.children.push(new NodeUI(this.node.child, this.ul, this.world, null));
        }
        //draw line
      }
    } else if (node instanceof Action){

    } else {
        if(this.node.children.length>0){
          for(let c of this.node.children){
            var nd = new NodeUI(c, this.ul, this.world, null);
            //paper.path('M'+(nav.offsetLeft)+','+nav.offsetTop+' L'+(chnav.offsetLeft)+','+chnav.offsetTop);
            //nd.line =
            //draw line
          }
        }
    }

    //this.update();
  }




}



  update(){

  }

  draw(){
    if(this.line!=null){

    }
  }

  resetFields(){

}

}


function generateBehaviorTree(node,parent){
  var prnt = parent;
  var li = $('<li class="node '+node.type+'"></li>');
  var nav = $('<nav class="node_menu '+node.type+'"></nav>');
  var h3 = $('<h3 class="icon '+node.type+'"></h3>');
  var btEdit = $('<a href="#" class="button edit"></a>');
  var btConfirm = $('<a href="#" class="button confirm"></a>');
  var btCancel = $('<a href="#" class="button cancel"></a>');
  var btDelete = $('<a href="#" class="button delete"></a>');
  var btAdd = $('<a href="#" class="button add"></a>');
  var label = $('<label>'+node.type+'</label>');
  var ul = $('<ul></ul>');
  var editArea = $('<div class="edit_area"></div>');
  var sectionName = $('<section class="section name '+node.type+'"></section>');
  var name = "";
  if(node.name!=null){
    name = node.name;
  }
  var nameSpan =  $('<span class="name_empty">Nome</span>');
  var nameInput = $('<input type="text" class="name_field" value="'+name+'" />');
  nav.append(h3);
  nav.append(btEdit);
  nav.append(btConfirm);
  nav.append(btCancel);
  nav.append(btDelete);
  nav.append(btAdd);
  nav.append(editArea);
  sectionName.append(nameSpan);
  sectionName.append(nameInput);
  editArea.append(sectionName);
  li.append(nav);
  li.append(label);
  li.append(ul);
  prnt.append(li);
  //alert('aaaaa');

  h3.click(function(){
    if(nav.hasClass("selected") && !nav.hasClass("edit_mode")){
      nav.removeClass("selected");
    } else {
      nav.addClass("selected");
    }
  });

btEdit.click(function(){
  if(nav.hasClass("edit_mode")){
    nav.removeClass("edit_mode");
  } else {
    nav.addClass("edit_mode");
  }
});

btCancel.click(function(){

});


  if(node instanceof Decorator){
    if(node instanceof Condition){
      if(node.child!=null){
        generateBehaviorTree(node.child,ul);
      }
    }
  } else if (node instanceof Action){

  } else {
      if(node.children.length>0){
        for(let c of node.children){
          //draw line
          generateBehaviorTree(c,ul);
        }
      }
  }

  return li;
}
