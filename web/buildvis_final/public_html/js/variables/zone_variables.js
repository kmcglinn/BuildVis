/**
 * @author Kris McGlinn
 *
 * Function to load in zones from ontology
 */
var can_select_wall = false;

var can_select = false;

//Booleans related to creating, deleting and displaying zones
var can_create_zone = false; //This must be set to true to draw a new zone.
var can_select_zone = false; //This is set when 
var zone_selected = false; //this is set to true when a zone has been selected (pressing xand clicking)
var g_zone_is_being_built = false; //
var current_zone_points = new Array();
var zone_activity_points = new Array(); //stores all the vertices of the activity zones
var zone_path_points = new Array(); //stores all the vertices of the path zones
var zone_occupied_points = new Array(); //stores all the vertices of the occupied zones
var zone_activity_array = new Array();

var current_activity_zone = new Zone('Activity', 0, 0,0,0,  0,0,0, "Office"); //Create an empty zone for the current zone
zone_activity_array.push(current_activity_zone); //The first object in the array stores a reference to the (current) zone which is currently being drawn.

//Booleans related to creating, deleting and displaying data about paths. 
//var can_select_path = false;
var can_create_path = false; //This is set to true when a zone has been selected and the key (c) has been pressed
var path_selected = false;
var path_connected = false; //this is set when a path is being created and the mouse goes over an existing path so that it selects the zones origin.
var can_save_path = false; //this is set when the path is connected to a zone aso that you san save the path
var can_view_path_id = false; //This is so that the current path id div is displayed on the page. 
var current_path_node_points = new Array(); //stores all the vertices of the path nodes
var path_node_points = new Array();
var set_start_path_id = false;
var path_finished = false;
var entrance_set = false;
var exit_set = false;

var zone_shader;
var zone_vp_loc;
var zone_vn_loc;
var zone_P_loc;
var zone_V_loc;
var zone_M_loc;
var zone_colour_loc;
var g_zone_shader_colour_loc;

var path_shader;
var path_vp_loc;
var path_vn_loc;
var path_P_loc;
var path_V_loc;
var path_M_loc;
var path_colour_loc;


var current_path_node_array = new Array();
var current_path_node = new PathNode();
var path_node_array = new Array();

var first_path_node = new PathNode();
var can_draw_activity_zones = true;
var activity_day = new Array();
var current_activity_type = "Activity"; //Store the surrent activity type

function Zone(type, id, p1X, p1Y, p1Z, p2X, p2Y, p2Z, sym){
    
    this.type = type;
    this.id = id;
    this.symbolic = sym;
    this.p1X = p1X;
    this.p1Y = p1Y;
    this.p1Z = p1Z;
    this.p2X = p2X;
    this.p2Y = p2Y;
    this.p2Z = p2Z;
    this.occupied = 0;
        
}

Zone.prototype.getInfo = function(){
    
    var string = 'Zone type: ' + this.type + '\n';
    string = string + 'Zone id: ' + this.id + '\n';
    string = string + 'Position x1: ' + this.p1X + ' y1: ' + this.p1Y + ' z: ' + this.p1Z + '\n';
    string = string + 'Position x2: ' + this.p2X + ' y2: ' + this.p2Y + ' z: ' + this.p2Z;;
        return string;        
}
function PathNode(id, p1X, p1Y, p1Z, has_activity_node_id){
    
    this.path_id = id;
    this.p1X = p1X;
    this.p1Y = p1Y;
    this.p1Z = p1Z;
    this.has_activity_node_id = has_activity_node_id;
        
}

PathNode.prototype.getInfo = function(){
    
        return 'Zone type: ' + this.type + '. Zone id: ' + this.id + 'Position 1 x, y, z: ' + this.p1X + ' : ' + this.p1Y + ' : ' + this.p1Z ;
        
}

var path_exit_id = "";
var path_entry_id = "";