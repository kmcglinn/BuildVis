var g_room_tags_file = "json/room_tags_demo.json";
var g_room_names = new Array ();
var g_room_positions = new Array ();
var g_room_text_indices = new Array ();

function init_room_tags () {
	console.log ("init room tags...\n");
	var tags = _load_rooms_json (g_room_tags_file).tags;
	console.log ("found " + tags.length + " tag entries\n");
	for (var i = 0; i < tags.length; i += 4) {
		g_room_names.push (tags[i]);
		g_room_positions.push ([tags[i + 1], tags[i + 2], tags[i + 3]]);
		var ti = create_text (tags[i], 0, 0.5, 0.5, 0.04, [0.5, 0.7, 0.2], true);
		g_room_text_indices.push (ti);
		move_text_3d (ti, [tags[i + 1], tags[i + 2], tags[i + 3]]);
		//console.log ("added room name " + g_room_names[g_room_names.length - 1] + " pos " + g_room_positions[g_room_positions.length - 1]);
	}
}

function update_room_tags() {
        
	console.log ("updating room tags...\n");
        var test_count = 0;
        g_room_names = new Array ();
        g_room_positions = new Array ();    
        g_room_text_indices = new Array ();
        g_text_array = new Array();
        var ti;
//        console.log(zone_activity_array.length);
        for(var i = 0; i < zone_activity_array.length; i++)
        {
//            console.log(zone_activity_array[i].symbolic);
            if(zone_activity_array[i].symbolic!=="Office")
            {
                g_room_names.push (zone_activity_array[i].symbolic);
//                console.log(midpoint(zone_activity_array[i].p1X, zone_activity_array[i].p2X));
//                console.log(midpoint(zone_activity_array[i].p1Y, zone_activity_array[i].p2Y));
//                console.log(midpoint(zone_activity_array[i].p1X, zone_activity_array[i].p2X));
                g_room_positions.push ([midpoint(zone_activity_array[i].p1X, zone_activity_array[i].p2X), midpoint(zone_activity_array[i].p1Z, zone_activity_array[i].p2Z), midpoint(zone_activity_array[i].p1Y, zone_activity_array[i].p2Y)]);
                if(zone_activity_array[i].type==="Activity"){
//                    console.log(zone_activity_array[i].symbolic);
                    ti = create_text (zone_activity_array[i].symbolic, 0, 0.5, 0.5, 0.03, [0.5, 0.7, 0.2], true);
                    test_count++;
                }
                else if(zone_activity_array[i].type==="Path")
                {
//                    alert(zone_activity_array[i].symbolic);
                    
                   ti = create_text (zone_activity_array[i].symbolic, 0, 0.5, 0.5, 0.04, [1.0, 0.0, 0.0], true); 
                   test_count++;
                }
                
                g_room_text_indices.push (ti);
                move_text_3d (ti, [midpoint(zone_activity_array[i].p1X, zone_activity_array[i].p2X), midpoint(zone_activity_array[i].p1Z, zone_activity_array[i].p2Z), midpoint(zone_activity_array[i].p1Y, zone_activity_array[i].p2Y)]);
                

            }
        }
   scale_text(0.9);
}

//function update_room_tags () {
	/*var MV = mult_mat4_mat4 (g_cam.mProjMat, g_cam.mViewMat);
	for (var i = 0; i < g_room_positions.length; i++) {

		// transform each one to NDS
		var nds_point = mult_mat4_vec4 (MV, vec4 (g_room_positions[i], 1.0));
		//alert (nds_point);
		nds_point[0] /= nds_point[3];
		nds_point[1] /= nds_point[3];
		nds_point[2] /= nds_point[3];
		//alert (nds_point);
	
		// TODO check if -1:1 else tag invisible
		if (Math.abs (nds_point[0] > 1.0)) {
		
		} else if (Math.abs (nds_point[1] > 1.0)) {
		
		} else if (Math.abs (nds_point[2] > 1.0)) {
	
		}
		
		// transform to screen space
		var ss_point = [nds_point[0], nds_point[1]];
		ss_point[0] = (ss_point[0] + 1.0) * 0.5;
		ss_point[1] = (ss_point[1] + 1.0) * 0.5;
		ss_point[1] = 1.0 - ss_point[1];
		//alert (nds_point + "->" + ss_point);
		
		// move
		change_text (
			g_room_text_indices[i], g_room_names[i], ss_point[0], ss_point[1]
		);
		//alert ("h");
		//console.log ("changin rt index: " + g_room_text_indices[i] + " " + g_room_names[i] + " " + ss_point[0] + "," + ss_point[1]);
	
		// tag visible TODO
	}*/
//}

function _load_rooms_json (url) {
	console.log ("loading room tags list meta " + url + "\n");
	// JSON file for meta-data
	var json = null;
	var xmlhttp = new XMLHttpRequest ();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			json = eval ("(" + xmlhttp.responseText + ")");
		}
	}
	xmlhttp.open("GET", url, false);
	xmlhttp.send(null);
	return json;
}


function _query_rooms_sparql () {

}