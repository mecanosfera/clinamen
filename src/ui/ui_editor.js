class EditorUI {

  constructor(args){
    this.init(args);
  }

  init(editor){
    this.editor = editor;
    this.world = $('#world');
    this.behavior = $('#behavior');
    this.agent = $('#agent');
    this.template = $('#template');
    this.agents = $('#agents');
    this.library = $('#library');
    this.zoom = 1;
    this.grid = new Grid(this,"world_grid",null);
    this.editTemplate = null;
    this.editWorld = null;
    this.editBehavior = null;
    this.mode="grid";

    this.start();
  }

  start(){
    var me = this;
    $(".world_behavior").width($(document).innerWidth()-this.library.outerWidth()-this.agent.outerWidth());
    $(".world_behavior").height($(document).innerHeight()-$('#info').outerHeight());
    $("#mode_button").click({s:this},function(e){
      var me = e.data.s;
      if(me.mode=="grid"){
        me.changeMode("behavior");
      } else {
        me.changeMode("grid");
      }
    });
    this.world.hide();
    this.behavior.hide();
    this.library.height($(document).innerHeight());
    this.agent.height($(document).innerHeight());
    for(var w of this.editor.worlds){
      var templates = $('<ul class="template_list"></ul>');
      if(w.templates!=null){
        for(var t of w.templates){
          var li = $('<li class="template_item">'+t.name+'</li>');
          li.dblclick({template:t,s:this},function(e){
            e.data.s.select(e.data.template);
          });
          templates.append(li);
        }
      }
      var world = $('<a href="#" class="world_link">'+w.name+'</a>');
      var world_li = $('<li class="world_item"></li>');
      /*world.click({t:templates},function(e){
        e.data.t.toggle();
      });*/
      world.dblclick({s:this,wr:w},function(e){
        $('.template_list .selected').removeClass('selected');
        $(this).addClass('selected');
        e.data.s.select(e.data.wr);
      });
      world_li.append(world);
      world_li.append(templates);
      //templates.hide();
      $('#library_list').append(world_li);
    }
  }

  changeMode(mode){
    if(mode=="behavior"){
      this.mode="behavior";
      this.world.hide();
      this.behavior.show();
      $("#mode_button").text("mundo");
    } else {
      this.mode="grid";
      this.world.show();
      this.behavior.hide();
      $("#mode_button").text("comportamento");
    }
  }

  select(entity){
    if(entity.type=="world"){
      this.editor.select(entity);
      this.editWorld = entity;
      this.mode = "grid";
      this.world.show();
      this.behavior.hide();
      this.grid = new Grid(this,"world_grid",this.editor.world.size);
      this.grid.draw(this.editor.world);
    } else if (entity.type=="agent"){
      //console.log(entity);
      this.editor.select(entity);
      this.editTemplate = entity;
      this.showTemplate(this.editTemplate);
      this.changeMode("behavior");
      if(this.editTemplate.children.length>0){
        this.editor.select(this.editTemplate.children[0]);
        this.editBehavior = this.editTemplate.children[0];
        this.showBehavior(this.editor.behavior);
      }
    }
  }

  showTemplate(entity){
    $('.path').text(this.editWorld.name+'/'+entity.name);
    $('#template_info').empty();
    var me = this;
    Object.keys(entity.state).forEach(function(s){
      var v = [s,entity.state[s]];
      var li = $('<li></li>');
      var lbl = $('<label>'+s+':</label>');
      var val = $('<span>'+entity.state[s]+'</span>');
      if(s!='x' && s!='y'){
        var edit = $('<div class="state_edit"></div>');
        var input = $('<input type="text" value="'+s+':'+entity.state[s]+'" />');
        var save = $('<a href="#" class="save">=</a>');
        var cancel = $('<a href="#" class="cancel">x</a>');
        li.dblclick(function(e){
          lbl.hide();
          val.hide();
          edit.show();
        });
        save.click({t:me,en:entity},function(e){
          if(input.val()!=""){
            var str = input.val().split(':');
            e.data.t.editor.update(e.data.en,str[0],s,str[1]);
            lbl.html(str[0]+":");
            val.html(str[1]);
            lbl.show();
            val.show();
            edit.hide();
            v = [s,entity.state[s]];
          } else {
            e.data.t.editor.update(e.data.en,s,v[0],null);
            $('#template_info').remove(li);
          }
        });
        cancel.click({},function(e){
          lbl.html(v[0]+":");
          val.html(v[1]);
          input.val(v[0]+":"+v[1]);
          lbl.show();
          val.show();
          edit.hide();
        });
      }
      edit.append(input);
      edit.append(save);
      edit.append(cancel);
      li.append(lbl);
      li.append(val);
      li.append(edit);
      $('#template_info').append(li);
      edit.hide();
    });

  }

  editTemplate(entity){

  }

  showBehavior(behavior){
    $('#behavior_tree').empty();
    generateBehaviorTree(behavior,$('#behavior_tree'));
  }

  create(type){
    if(type=="world"){
      if(this.editWorld=null){
        this.editWorld = world;
        this.mode = "grid";
        this.world.show();
        this.behavior.hide();
        this.grid = new Grid();
      }
    } else if (type=="template"){

    }
  }







}
