class EditorUI {

  constructor(args){
    this.init(args);
  }

  updateSize(){
    var editorEntityWidth = 0;
    if(!$('#editor_entity').is(':hidden')){
      editorEntityWidth = $('#editor_entity').outerWidth();
    }
    this.el.width($(document).innerWidth());
    this.el.height($(document).innerHeight()-$("#top").outerHeight(true));
    $(".editor_main").width(this.el.width()-$("#library").outerWidth()-editorEntityWidth);
    $("#library").height(this.el.height());
    $("#editor_entity").height(this.el.height()-5);
  }

  init(args){
    this.editor = args.editor;
    this.grid;
    this.el = $("#editor");
    this.em = new EntityMenu(this);
    $("#editor_main_start").show();
    $("#editor_main_edit_world").hide();
    $("#editor_main_edit_tree").hide();
    $("#world_grid").hide();
    $("#editor_entity").hide();
    this.updateSize();
    $('window').resize(this.updateSize);
  }


  start(){
    var ed = $("#editor");
    $("#bt_criar_mundo").click(this,function(evt){
      evt.data.editor.edit(null,"world");
      evt.data.edit("world");
      evt.data.em.add(evt.data.editor.world);
    });
  }

  edit(type){
    var eent = '#editor_entity';
    if(type=="world"){
      $("#editor_main_edit_world").show();
      $("#editor_main_start").hide();
      $("#editor_main_behavior").hide();
      var world = this.editor.world;
      if(world.name!=null){
        $("#editor_world_name").text(world.name);
      }
      if(world.size!=null && world.size.length>0 && world.size[0]>0 && world.size[1]>0){
        $("#editor_world_size").text(world.size[0]+","+world.size[1]);
        this.grid = new Grid(this,"editor_world_grid",world.size);
        this.grid.draw(world);
      } else {
        $("#editor_world_size").text("[0,0]");
      }
      this.updateSize();
    } else if (type=="agent"){
      //$('#editor_entity h3').text('agente');
      $('#editor_entity').show();
      $('#editor_agent').show();
      $('#editor_empty_cell').hide();
      $('#editor_tree').hide();
      this.updateSize();

      $('#editor_entity_type_icon').attr('className','agent');
      $('#editor_entity_name').text(this.editor.agent.name);
      if(this.editor.agent.world!=null){
        $('#editor_entity_parent').text(this.editor.agent.world.name);
      } else {
        $('#editor_entity_parent').text('');
      }
      $('#editor_entity_type').text('agente');


      if(this.editor.agent.name!=null){
        $('#editor_agent_name_txt').hide();
      } else {
        $('#editor_agent_name_txt').show();
      }

      if(this.editor.agent.world!=null){
        //$('#editor_agent_world').text(this.editor.agent.world.name);
        $('#editor_agent_position').text('x:'+this.editor.agent.position[0]+' y:'+this.editor.agent.position[1]);
      }


      for(let p in this.editor.agent.prop){
        var pvalue = this.editor.agent.prop[p];
        if(typeof pvalue === "string"){
          pvalue = '"'+pvalue+'"';
        }
        $('#editor_agent_properties_fields').append('<li><label>'+p+':</label><span class="editor_agent_property">'+pvalue+'</span></li>');
      }

    } else if (type=="empty_cell") {
      //$('#editor_entity h3').text('célula vazia');
      $('#editor_entity').show();
      $('#editor_agent').hide();
      $('#editor_empty_cell').show();
      $('#editor_tree').hide();
      this.updateSize();

      $('#editor_empty_cell_world').text(this.editor.world.name);
      $('#editor_empty_cell_position').text('x:'+this.editor.selectedPosition[0]+' y:'+this.editor.selectedPosition[1]);
    } else { //tree
      $("#editor_main_edit_world").hide();
      $("#editor_main_edit_tree").show();

      var tree = new NodeUI(this.editor.tree, $('#editor_tree_edit'), this.editor.world);
      //this.em.addNode(this.editor.tree, $('#editor_tree_edit'));
      //alert(JSON.stringify(this.editor.generateTreeConfig(this.editor.tree)));
      //this.chart = new Treant(this.editor.generateTreeConfig(this.editor.tree),function(){alert('x')},$);

      //$('#editor_entity h3').value('comportamento');

    }
  }


  updateFileTree(){

  }
}
