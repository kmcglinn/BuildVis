// * Version: 0.1
// * 
// * Date: 18.02.2013
// *  
// * Author: Kris McGlinn
// * 
// * Last Modified: 18/08/13
// * 
// * Copyright: 	Knowledge and Data Engineering Group, 
// * 				Department of Computer Science,
// * 				Faculty of Engineering and Systems Science,
// * 				Trinity College
// * 				Dublin 2
// * 				Ireland  
// * 


var DEBUG_MODE_ON = true;

var energy_monitoring_visible = false;
var logging_interface_visible = false;
var web_gl_visible = false;
var activity_modeller_visible = false;
//var main_header_text = "Activiteiten Model Applicatie";

// Variables related to which building specific ontology is in use
web_gl_on = true;
//var web_gl_clip_edges = true;
var web_gl_disable_keyboard = true;
//web_gl_on = false;

local_host = 0; //1 = localhost, 0 = phaedrus
fm_view = false;
fm_view = true;

buildings = ["forum", "mediatic", "blunet", "PICA", "hhs", "Lloyd", "OReilly"];



languages = ["English", "Dutch", "Spanish"];
current_language = 0;


current_activity_tab = 0;


real_time_sensor_value = 0;
total_real_time_sensor_value = 0;
zone_load_divisor = 1;
zone_load_modifier_x = 0;
zone_load_modifier_y = 0;

wall_load_divisor = 1;
wall_load_modifier_x = 0;
wall_load_modifier_y = 0;


if(current_building === 0) //Forum
{
    if(local_host===1)
    {
        
        sparql_end_point = "http://localhost:3030/ds/query";
        sparql_end_point_update = "http://localhost:3030/ds/update"; 
        
    }
    else
    {
        
//        sparql_end_point = "http://phaedrus.scss.tcd.ie/fuseki3/ds/query"; //End point for queries
//        sparql_end_point_update = "http://phaedrus.scss.tcd.ie/fuseki3/ds/update"; //End point for updates
        sparql_end_point = "http://phaedrus.scss.tcd.ie/fuseki/ds/query"; //End point for queries
        sparql_end_point_update = "http://phaedrus.scss.tcd.ie/fuseki/ds/update"; //End point for updates
        
    }
    console.log("Creating fuseki END point: " + sparql_end_point);
    
    g_walls_xml_url = "cad_xml/smart_homes_cad.xml";
    current_language = 1;
   
   //WebGL
    camera_pos = [-70, 40, 50];
    
    cam_left_limit = 0;
    cam_right_limit = 0;
    cam_top_limit = 0;
    cam_bottom_limit = 10;
    
    zone_load_divisor = 795;
    zone_load_modifier_x = 32.4;
    zone_load_modifier_y = -6;
    
    table_room_number_array = ["e.g. Rc.0.01"];
   
    day_start_location = ["P1", "P5", "P6"];
    day_start_path_entry = ["P3", "P4", "P2-P3", "P2-P4"];
    day_start_path_exit = ["P3", "P4", "P3-P2", "P4-P2"];
   
    meeting_location = ["e.g. Rc.0.04", 'Outside', 'Your Office'];
    
    lunch_location = ["e.g. Rc.0.13", "Rc.0.38", 'Outside', 'Your Office'];
    
    
    lunch_path_array_entry=["P2-P3", "P2-P4","P3", "P4"];
    lunch_path_array_exit = day_start_path_exit;
    meeting_path_array = ["P3", "P4", "P2-P3", "P2-P4", "No Path"];
    meeting_path_array_exit = ["P3", "P4", "P3-P2", "P4-P2", "No Path"];
   
    breaks_location_array = ["P6", "P5", "P1", "R07", "R13","R15", "R36"];
    breaks_path_entry_array = ["P3", "P4", "P2-P3", "P2-P4", "P1-P2-P3", "P1-P2-P4", "No Path"];
    breaks_path_exit_array = ["P3", "P4", "P3-P2", "P4-P2", "No Path"];
//    day_start_time_array = ["e.g. 09:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];
    day_start_time_array = ["e.g. 09:00"] 
//    day_end_time_array = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];
    day_end_time_array = ["e.g. 17:00"]
//    lunch_times = ["10:00", "10:30","11:00", "11:30", "12:00", "12:30", "13:00", "13:30","14:00", "14:30"];
    lunch_times = ["e.g. 13:00"]
//    lunch_times_end = ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30","14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
    lunch_times_end = ["e.g. 14:00"];
    
    energy_monitoring_visible = true;
    logging_interface_visible = true;
    web_gl_visible = true;
    activity_modeller_visible = false;
    
}
else if(current_building === 1) //Media-tic
{
//    alert('Test Media-TIC');
    if(local_host===1)
    {

        sparql_end_point = "http://localhost:3031/ds/query";
        sparql_end_point_update = "http://localhost:3031/ds/update"; 
        
    }
    else
    {

        sparql_end_point = "http://phaedrus.scss.tcd.ie/fuseki2/ds/query"; //End point for queries
        sparql_end_point_update = "http://phaedrus.scss.tcd.ie/fuseki2/ds/update"; //End point for updates

    }
    console.log("Creating END point: " + sparql_end_point);
    
    g_walls_xml_url = "cad_xml/media-tic5.xml";
    
    current_language = 2; //Spanish
    
    
    table_room_number_array = ["R01", "R02", "R03","R04", "R05", "R06", "R07", "R08", "R09", "R10", "R11", "R12", "S02", "S03","S04", "S08", "S09", "S10", "S11", "S12"];
    
    day_start_location = ["P1"];
    day_start_path_entry = ["P2"];
    
//    day_path_array_entry = ["P2", "No hay un camino disponible"];
    day_start_path_exit = ["P2"];
    
    meeting_location = ["S05","S06", "S07", "P1"];
    lunch_location = ["P1", "S01"];
    
    no_path_text = "No hay un camino disponible";
    
    lunch_path_array_entry = ["P2", "No hay un camino disponible"];
    lunch_path_array_exit = ["P2", "No hay un camino disponible"];
    meeting_path_array_exit = ["P2", "No hay un camino disponible"];
    meeting_path_array = ["P2", "No hay un camino disponible"];
    
    breaks_location_array = ["P1", "P3", "S01", "TM1", "TF1"];
    breaks_path_entry_array = ["P2", "No hay un camino disponible"];
    breaks_path_exit_array = ["P2", "No hay un camino disponible"];
    
    day_start_time_array = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]
    day_end_time_array = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];
    lunch_times = ["10:00", "10:30","11:00", "11:30", "12:00", "12:30", "13:00", "13:30","14:00", "14:30", "15:00"];
    lunch_times_end = ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30","14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
    //WebGL
    //camera
    
    camera_pos = [-52.44, 30.60, 17.52];
    cam_left_limit = -40;
    cam_right_limit = 80;
    cam_top_limit = 0;
    cam_bottom_limit = -90;
    
    zone_load_divisor = 8;
    zone_load_modifier_x = -6;
    zone_load_modifier_y = 8;
    
    energy_monitoring_visible = true;
    logging_interface_visible = true;
    web_gl_visible = true;
    activity_modeller_visible = true;
}
else if(current_building === 2) //Bluenet
{
    if(local_host===1)
    {
        sparql_end_point = "http://localhost:3031/ds/query";
        sparql_end_point_update = "http://localhost:3031/ds/update"; 
    }
    else
    {

        sparql_end_point = "http://phaedrus.scss.tcd.ie/fuseki3/ds/query"; //End point for queries
        sparql_end_point_update = "http://phaedrus.scss.tcd.ie/fuseki3/ds/update"; //End point for updates
//        console.log("Creating END point: " + end_point);
    }
    console.log("Creating END point: " + sparql_end_point);
    
    g_walls_xml_url = "cad_xml/A-07_no_exterior.xml";
    
    current_language = 2; //Spanish
    
    table_room_number_array = ["R01", "R02", "R03","R04", "R05", "R06", "R07", "M02", "M03", "M04", "M08", "M09"];
//    
    day_start_location = ["P1"];
    day_start_path_entry = ["P2"];
    
//    day_path_array_entry = ["P2", "No hay un camino disponible"];
    day_start_path_exit = ["P2"];
    
    meeting_location = ["M01", "M02", "M03", "M04", "M08", "M09", "P1", "P1",  "P2", "P3", "P4"];
    lunch_location = ["C01", "P1",  "P2", "P3", "P4"];
    
    no_path_text = "No hay un camino disponible";
    
    lunch_path_array_entry = ["P2", "No hay un camino disponible"];
    lunch_path_array_exit = ["P2", "No hay un camino disponible"];
    meeting_path_array_exit = ["P2", "No hay un camino disponible"];
    meeting_path_array = ["P2", "No hay un camino disponible"];
    
    breaks_location_array = ["P1", "P3", "S01", "TM1", "TF1"];
    breaks_path_entry_array = ["P2", "No hay un camino disponible"];
    breaks_path_exit_array = ["P2", "No hay un camino disponible"];
    
    day_start_time_array = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]
    day_end_time_array = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];
    lunch_times = ["10:00", "10:30","11:00", "11:30", "12:00", "12:30", "13:00", "13:30","14:00", "14:30", "15:00"];
    lunch_times_end = ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30","14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
//    //WebGL
//    //camera
//    

    camera_pos = [-40.44, 50.60, 17.52];
    cam_left_limit = -40;
    cam_right_limit = 80;
    cam_top_limit = 0;
    cam_bottom_limit = -110;
//    
    zone_load_divisor = 4.6;
    zone_load_modifier_x = -20;
    zone_load_modifier_y = -92;
    
    wall_load_divisor = 0.003;
    wall_load_modifier_x = 0;
    wall_load_modifier_y = 0;
    
    
    energy_monitoring_visible = true;
    logging_interface_visible = true;
    web_gl_visible = true;
    activity_modeller_visible = false;
}
else if(current_building === 3) //PICA
{
    if(local_host===1)
    {
//        sparql_end_point = "http://localhost:3030/ds/query";
//        sparql_end_point_update = "http://localhost:3030/ds/update";  
        sparql_end_point = "http://localhost:3031/ds/query";
        sparql_end_point_update = "http://localhost:3031/ds/update"; 
    }
    else
    {
//        sparql_end_point = "http://phaedrus.scss.tcd.ie/fuseki2/ds/query"; //End point for queries
//        sparql_end_point_update = "http://phaedrus.scss.tcd.ie/fuseki2/ds/update"; //End point for updates
        sparql_end_point = "http://phaedrus.scss.tcd.ie/fuseki4/ds/query"; //End point for queries
        sparql_end_point_update = "http://phaedrus.scss.tcd.ie/fuseki4/ds/update"; //End point for updates
//        console.log("Creating END point: " + end_point);
    }
    console.log("Creating END point: " + sparql_end_point);
    
//    g_walls_xml_url = "cad_xml/pica-1.xml";
    g_walls_xml_url = "cad_xml/pica-full.xml";
    
    current_language = 2; //Spanish
    
    table_room_number_array = ["Número de Oficina"];
//    
    day_start_location = ["P1"];
    day_start_path_entry = ["P2"];
    
//    day_path_array_entry = ["P2", "No hay un camino disponible"];
    day_start_path_exit = ["P2"];
    
    meeting_location = ["Número de Oficina", "Al aire libre", "Otro"];
    lunch_location = ["Número de Oficina", "Al aire libre", "Otro"];
    
    no_path_text = "No hay un camino disponible";
    
    lunch_path_array_entry = ["P2", "No hay un camino disponible"];
    lunch_path_array_exit = ["P2", "No hay un camino disponible"];
    meeting_path_array_exit = ["P2", "No hay un camino disponible"];
    meeting_path_array = ["P2", "No hay un camino disponible"];
    
    breaks_location_array = ["P1", "P3", "S01", "TM1", "TF1"];
    breaks_path_entry_array = ["P2", "No hay un camino disponible"];
    breaks_path_exit_array = ["P2", "No hay un camino disponible"];
    
    day_start_time_array = ["e.g. 09:00"]
    day_end_time_array = ["e.g. 17:00"];
    lunch_times = ["e.g. 12:00"];
    lunch_times_end = ["e.g. 13:00"];
//    //WebGL
//    //camera
//    
    camera_pos = [-45, 80, 45];
    cam_left_limit = -40;
    cam_right_limit = 80;
    cam_top_limit = 0;
    cam_bottom_limit = -110;
//    
    zone_load_divisor = 0.8;
    zone_load_modifier_x = -5289.8;
    zone_load_modifier_y = 618.5;
    
    wall_load_divisor = 0.001;
    wall_load_modifier_x = 0;
    wall_load_modifier_y = 0;
    
    energy_monitoring_visible = false;
    logging_interface_visible = false;
    web_gl_visible = true;
    activity_modeller_visible = true;
    
}
if(current_building === 4) //HHS
{
    if(local_host===1)
    {
        
        sparql_end_point = "http://localhost:3030/ds/query";
        sparql_end_point_update = "http://localhost:3030/ds/update"; 
        
    }
    else
    {
        
        sparql_end_point = "http://phaedrus.scss.tcd.ie/fuseki5/ds/query"; //End point for queries
        sparql_end_point_update = "http://phaedrus.scss.tcd.ie/fuseki5/ds/update"; //End point for updates
        
    }
    console.log("Creating fuseki END point: " + sparql_end_point);
    
    g_walls_xml_url = "cad_xml/hhs.xml";
    current_language = 1;
   
   //WebGL
    camera_pos = [-62, 20, 24]; //y, z ,x
    
    cam_left_limit = 0;
    cam_right_limit = 0;
    cam_top_limit = 0;
    cam_bottom_limit = 10;
    
    wall_load_divisor = 0.02;
    wall_load_modifier_x = -45;
    wall_load_modifier_y = 15;
    
    zone_load_divisor = 1.2;
    zone_load_modifier_x = 55;
    zone_load_modifier_y = -2;
    
    energy_monitoring_visible = false;
    logging_interface_visible = false;
    web_gl_visible = true;
    activity_modeller_visible = true;
}
else if(current_building === 6)
{
    sparql_end_point = "http://localhost:3032/ds/query";
    sparql_end_point_update = "http://localhost:3032/ds/update"; 
    
    g_walls_xml_url = "cad_xml/lloyd.xml";
    current_language = 0;
    
    camera_pos = [-40, 30, 25];
    
}
else if(current_building === 7)
{
    if(local_host===1)
    {

        sparql_end_point = "http://localhost:3031/ds/query";
        sparql_end_point_update = "http://localhost:3031/ds/update"; 
    }
    else
    {

        sparql_end_point = "http://phaedrus.scss.tcd.ie/fuseki5/ds/query"; //End point for queries
        sparql_end_point_update = "http://phaedrus.scss.tcd.ie/fuseki5/ds/update"; //End point for updates
//        console.log("Creating END point: " + end_point);
    }
    
    g_walls_xml_url = "cad_xml/oriFF.xml";
    current_language = 0;
    
    camera_pos = [0, 20, 14];
    cam_left_limit = -40;
    cam_right_limit = 80;
    cam_top_limit = 0;
    cam_bottom_limit = -110;
//    
    zone_load_divisor = 1;
    zone_load_modifier_x = 0;
    zone_load_modifier_y = 0;
    
    wall_load_divisor = 1;
    wall_load_modifier_x = 0;
    wall_load_modifier_y = 0;
    
}

console.log('Setting Building To: ' + buildings[current_building]);
console.log('Setting Language To: ' + languages[current_language]);


var user_id_handsontable_data = [
            ["001"],
////            [""]/*,
//            [""],
//            ["11"],
//            ["2012"]*/
        ];
        
var work_place_handsontable_data;

var path_chosen = undefined;


var normals_vs_url = "shaders/basic_vs.glsl";
var normals_fs_url = "shaders/basic_fs.glsl";

var ssao_vs_url = "shaders/ssao_quad_vs.glsl";
var ssao_fs_url = "shaders/ssao_quad_fs.glsl";
var depth_vs_url = "shaders/depth_vs.glsl";
var depth_fs_url = "shaders/depth_fs.glsl";
var blur_vs_url = "shaders/blur_vs.glsl";
var blur_fs_url = "shaders/blur_fs.glsl";
var phong_vs_url = "shaders/phong_vs.glsl";
var phong_fs_url = "shaders/phong_fs.glsl";

var sensor_vs_url = "shaders/sensor_vs.glsl";
var sensor_fs_url = "shaders/sensor_fs.glsl";

var light_vs_url = "shaders/light_vs.glsl";
var light_fs_url = "shaders/light_fs.glsl";

var zone_vs_url = "shaders/zone_vs.glsl";
var zone_fs_url = "shaders/zone_fs.glsl";

var path_vs_url = "shaders/path_vs.glsl";
var path_fs_url = "shaders/path_fs.glsl";

var path_zone_vs_url = "shaders/path_zone_vs.glsl";
var path_zone_fs_url = "shaders/path_zone_fs.glsl";

var wall_vs_url = "shaders/wall_vs.glsl";
var wall_fs_url = "shaders/wall_fs.glsl";

var floor_vs_url = "shaders/floor_vs.glsl";
var floor_fs_url = "shaders/floor_fs.glsl";

var activity_save_message = "Activity was saved. You may click load to test to see if your activity was entered correctly.";

//var zone_vp_vbo_idx = undefined;
//var g_zone_pos = [0,0,0];
//var g_zone_model_mat = identity_mat4 ();
//var g_zone_shader;

//phaedrus.scss.tcd.ie/fuseki  --> kdeg-vm-46.scss.tcd.ie:3030 Building 0 -> Forum
//phaedrus.scss.tcd.ie/fuseki2 --> kdeg-vm-46.scss.tcd.ie:3031 Building 1 -> Media-Tic
//phaedrus.scss.tcd.ie/fuseki3 --> kdeg-vm-46.scss.tcd.ie:3032 Building 2 -> BlueNet
//phaedrus.scss.tcd.ie/fuseki4 --> kdeg-vm-46.scss.tcd.ie:3033 Building 3 -> PICA
//phaedrus.scss.tcd.ie/fuseki5 --> kdeg-vm-46.scss.tcd.ie:3033 Building 4 -> HHS
//
//
//phaedrus.scss.tcd.ie/fuseki5 --> kdeg-vm-46.scss.tcd.ie:3034 Building 7 -> O'Reilly
//phaedrus.scss.tcd.ie/fuseki6 --> kdeg-vm-46.scss.tcd.ie:3035 
//phaedrus.scss.tcd.ie/fuseki7 --> kdeg-vm-46.scss.tcd.ie:3036 
//phaedrus.scss.tcd.ie/fuseki8 --> kdeg-vm-46.scss.tcd.ie:3037 
//phaedrus.scss.tcd.ie/fuseki9 --> kdeg-vm-46.scss.tcd.ie:3038 
//phaedrus.scss.tcd.ie/fuseki10 -> kdeg-vm-46.scss.tcd.ie:3039 

avg_sensor_value = 0;

if (!DEBUG_MODE_ON) {
    console = console || {};
    console.log = function(){};
}