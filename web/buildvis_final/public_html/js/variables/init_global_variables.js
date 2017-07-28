/**
 * @author Kris McGlinn
 *
 */
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// Variables related to which building specific ontology is in use
var web_gl_on;
//web_gl_on = false;

var local_host; //1 = localhost, 0 = phaedrus
var fm_view;
var buildings;
var languages;
var current_language;

//Stores the current activity tab (i.e. 0,1,2)
var current_activity_tab;

var iActivities;

//For connecting to different fuseki servers
var sparql_end_point;
var sparql_end_point_update; 

//For loading different building models.
var g_walls_xml_url;

var camera_pos;// = [-49.44, 35.60, 55.52]; //Default
//alert(camera_pos);
var cam_left_limit;
var cam_right_limit;
var cam_top_limit;
var cam_bottom_limit;

var zone_load_divisor;
var zone_load_modifier_x;
var zone_load_modifier_y;

var wall_load_divisor;
var wall_load_modifier_x;
var wall_load_modifier_y;

var no_office_alert_string;
//var walls_xml_url 
//var walls_xml_url = "cad_xml/ORI_FF.xml";
var day_start_time_array;
var day_end_time_array;
var lunch_times;



var table_room_number_array;
   
var day_start_location;
var day_start_path_entry;
var day_start_path_exit;
   
var meeting_location;
var lunch_location;
var lunch_path_array_entry;
var lunch_path_array_exit = day_start_path_exit;
var meeting_path_array;
var meeting_path_array_exit;
   
var breaks_location_array;
var breaks_path_entry_array;
var breaks_path_exit_array;
var day_start_time_array;
var day_end_time_array;
var lunch_times;
var lunch_times_end;

/*
 * Variables related to localisation of language 
 */

var handsontable_user_id_text;
var handsontable_room_number_text;

var no_path_text;

var monday_text;
var tuesday_text;
var wednesday_text;
var thursday_text;
var friday_text;
var saturday_text;
var sunday_text;

var begin_text;
var end_text;
var entrance_text;
var exit_text;
var entrance_route_text;
var exit_route_text;
var route_text;
var alt_route_text;

var location_text;
var summary_text;
var path_text;
//var return_path_text = "Terguke";

var duration_text;

/*
 * End language localisation variables
 */

var real_time_sensor_value;
var total_real_time_sensor_value;
var avg_sensor_value;