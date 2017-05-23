class EditorUI {

  constructor(args){
    this.init(args);
  }

  init(args){
    if(args!=null){
      this.editor = args.editor;
    }
    this.editorElement = $("#editor");
    //alert($("#info").outerWidth(true));
    //alert($(document).innerWidth());
    this.editorElement.width($(document).innerWidth());
    this.editorElement.height($(document).innerHeight()-$("#top").outerHeight(true));
    $("#world_grid").hide();
    this.grid;
  }


  start(){
    var ed = $("#editor");
    $("#bt_criar_mundo").click(this,function(evt){
      evt.data.editor.editWorld(null);
      evt.data.editWorld();
    });
  }

  editWorld(){
    $("#editor_main_edit_world").show();
    $("#editor_main_start").hide();
    $("#editor_main_behavior").hide();
    var world = this.editor.world;
    if(world.name!=null){
      $("#editor_world_name").text(world.name);
    }
    if(world.size!=null && world.size.length>0 && world.size[0]>0 && world.size[1]>0){
      $("#editor_world_size").text("["+world.size[0]+","+world.size[1]+"]");
      this.grid = new Grid(this,"editor_world_grid",world.size);
      this.grid.draw();
    } else {
      $("#editor_world_size").text("[0,0]");
    }


  }


  updateFileTree(){

  }




}
