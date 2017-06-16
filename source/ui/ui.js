class Grid {

  constructor(ui,grid,size){
    this.ui = ui;
    this.zoom = ui.zoom;
		this.canvas = document.getElementById(grid);
    this.size = {X:size[0],Y:size[1]};
		this.canvas.width = this.size.X*20;
		this.canvas.height = this.size.Y*20;
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

  draw(world){
    for(let x=0;x<this.size.X;x++){
      for(let y=0;y<this.size.Y;y++){
          this.cxt.strokeStyle='#666';
          this.cxt.fillStyle='#ffffff';
          this.cxt.fillRect(x*this.tamanhoCelula,y*this.tamanhoCelula,this.tamanhoCelula,this.tamanhoCelula);
    			this.cxt.strokeRect((x*this.tamanhoCelula),(y*this.tamanhoCelula),this.tamanhoCelula,this.tamanhoCelula);
      }
    }

    for(let a of world.agents){
      this.cxt.fillStyle = '#000000';
      this.cxt.fillRect(a.position[0]*this.tamanhoCelula,a.position[1]*this.tamanhoCelula,this.tamanhoCelula,this.tamanhoCelula);
      this.cxt.strokeRect((a.position[0]*this.tamanhoCelula),(a.position[1]*this.tamanhoCelula),this.tamanhoCelula,this.tamanhoCelula);
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
        for(let a of entity.agents){
          this.add(a,ul);
        }
    }

    li.append(icon);
    li.append(ent);
    li.append(ul);
    prnt.append(li);
  }

  select(ents){

  }


  addNode(node,parent){
    var prnt = parent;
    var li = $('<li class="node '+node.type+'"></li>');
    var view = $('<div class="item_node_view"></div>');
    var edit = $('<div class="item_node_edit"></div>');
    var name = node.name+":"+node.type;

    //var icon = $('<span class="icon_node '+node.type+'"></span>');
    var entView = $('<a href="#" class="item_node">'+node.name+":"+node.type+'</a>');
    var entEdit = $('<input type="text" class="item_node_name edit" value="'+node.name+'"> : <a href="#" class="item_node_type edit">'+node.type+'</a>');
    var btEdit = $('<a href="#" class="item_node_btedit"></a>');
    var btDelete = $('<a href="#" class="item_node_delete"></a>');
    var btConfirm = $('<a href="#" class="item_node_confirm edit"></a>');
    var btCancel = $('<a href="#" class="item_node_cancel edit"></a>');
    var extraInfo = $('<div class="item_node_info view"></div>');
    var extraEdit = $('<div class="item_node_options edit"></div>');
    var btAdd = $('<a href="#" class="item_node_add">+</a>');
    var ul = $('<ul class="item_node_children '+node.type+'"></ul>');

    view.append(entView);
    view.append(btEdit);
    view.append(extraInfo);

    edit.append(entEdit);
    edit.append(btConfirm);
    edit.append(btCancel);
    edit.append(extraEdit);

    li.append(view);
    li.append(edit);

    if(node instanceof Action){
      //definições de ação
    } else if (node instanceof Condition) {
      //view
      var op = $('<span class="item_node_view_operator item_condition view"></span>');
      var condition1 = $('<ul class="item_node_view_condition item_condition view"></ul>');
      var condition2 = $('<ul class="item_node_view_condition item_condition view"></ul>');;
      if(node.condition!=null){
        op.text(node.condition[0]);
        if(node.condition[1] instanceof Object){
          //for(let p of node.condition[1]){
          //  condition1.append('<li>'+p+': '+node.condition[1][p]+'</li>');
          //}
        } else {
          condition1.append('<li>'+node.condition[1]+'</li>');
        }
        if(node.condition[2] instanceof Object){
          //for(let p of node.condition[2]){
          //  condition2.append('<li>'+p+': '+node.condition[2][p]+'</li>');
          //}
        } else {
          condition2.append('<li>'+node.condition[2]+'</li>');
        }
      }
      extraInfo.append(op);
      extraInfo.append(condition1);
      extraInfo.append(condition2);

      //edit
      var opSel = $('<select class="item_node_edit_operation edit"></select>');
      var operators = ['==','===','!=','!==','>','<','>=','<='];
      var cond1 = $('<ul class="item_node_edit_condition item_condition edit"></ul>');
      var cond2 = $('<ul class="item_node_edit_condition item_condition edit"></ul>');
      for(let o in operators){
        var opIt = $('<option value="'+o+'">'+o+'</option>');
        if(node.condition!=null && node.condition[0]==o){
          opIt.attr("selected");
        }
        opSel.append(opIt);
      }

      extraEdit.append(opSel);
      extraEdit.append(cond1);
      extraEdit.append(cond2);

      //continuar, condições

      this.addNode(node.child,ul);
      li.append(btAdd);
    } else if (node instanceof Decorator){
      li.append(btAdd);
      this.addNode(node.child,ul);
    } else {
      li.append(btAdd);
      for(let c of node.children){
        this.addNode(c,ul);
      }
    }

    /*icon.click(function(){
      ul.toggle();
    });
    ent.click(this,function(evt){
      evt.data.select([node,li]);
    });
    ent.dblclick(this,function(evt){
      evt.data.editorUI.editor.edit(node,"tree");
      evt.data.editorUI.edit("tree");
    });*/

    li.append(ul);
    prnt.append(li);
  }


}

/*class BehaviorTreeUI {

  constructor(args){
    this.init(args);
  }

  init(args){
    this.editor = args.editor;
    this.node = args.node;
    this.el = args.element;
  }

  constructTree(node,el){
    var prnt = this.el;
    if(el!=null){
      prnt = el;
    }
    var ul = $('<ul></ul>');
    var main = $('<li></li>');
    var title = $('<h4>'+node.name+':'+node.type+'</h4>');
    var info = $('<div class="node_info"></div>');
    var width = 0;
    if(node.UUID!=null){
      info.append('<label>UUID:</label><span>'+node.UUID+'</span>');
    }
    if(node instanceof Condition){
      //
    }
    main.append(title);
    main.append(info);
    ul.append(main);

    if(node instanceof Action){
      ul.width(50);
    } else if (node instanceof Decorator){
      var child = $('<li><h4>child:</h4></li>');
      if(node.child!=null){
        this.constructTree(node.child,child);
        ul.append(child);
      }
    } else if (node instanceof Node){
      var children = $('<li><h4>children:</h4></li>');
      for(let c of node.children){
        this.constructTree(c,children);
      }
      ul.append(children);
    }

    prnt.append(ul);
  }
}*/
