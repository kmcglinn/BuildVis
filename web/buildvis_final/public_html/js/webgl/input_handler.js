// mouse
var g_mouse_x;
var g_mouse_y;
// if the mouse button is held down or has been released
var g_mouse_down = false;

function init_input_handler () {
	_init_mouse ();
	
	// BOM keyboard handling callbacks
	document.onkeydown = function (event) {
		currentlyPressedKeys[event.keyCode] = true;
	}
	document.onkeyup = function (event) {
		currentlyPressedKeys[event.keyCode] = false;
	}
	
}

function get_mouse_coords(event){
    
    var element = g_canvas;
    var top = 0;
    var left = 0;
    while (element && element.tagName != 'BODY')
    {
            top += element.offsetTop;
            left += element.offsetLeft;
            element = element.offsetParent;
    }
    // adjust for scrolling
    left += window.pageXOffset;
    top -= window.pageYOffset;
    mouse_x = event.clientX - left;
    mouse_y = (event.clientY - top);
    // sometimes range is a few pixels too big
    if (mouse_x >= gl.viewportWidth) 
    {
            return;
    }
    if (mouse_y >= gl.viewportHeight) 
    {
            return;
    }
    
}

function _init_mouse () {
	
    g_canvas.onmousedown = function (event) 
    {
    // cam gui
        console.log("MOUSE DOWN");
        g_mouse_down = true;

        var element = g_canvas;
        var top = 0;
        var left = 0;
        while (element && element.tagName != 'BODY')	{
                            top += element.offsetTop;
                            left += element.offsetLeft;
                            element = element.offsetParent;
        }
        // adjust for scrolling
        left += window.pageXOffset;
        top -= window.pageYOffset;
        g_mouse_x = event.clientX - left;
        g_mouse_y = (event.clientY - top);
        // sometimes range is a few pixels too big
        if (g_mouse_x >= g_canvas.width) {
                return;
        }
        if (g_mouse_y >= g_canvas.height) {
                return;
        }
        //alert("Mouse down...MOUSE DOWN!")
        // if mouse held don't keep restarting this
        console.log("ON MOUSE DOWN::CAN SELECT WALL: - " + can_select_wall);
        if(can_select_wall)
        {
            console.log("For loop started");
            var ray = get_mouse_ray_wor (mouse_x, mouse_y);
            for(var i = 0; i< walls_vp_array.length; i++){
                if (ray_plane (ray, g_cam.mWC_Pos, [0, 1, 0], 0)) 
                {
                    //console.log ("ray hit");
                } else 
                {
                    //console.log ("ray missed somehow");
                }
            }
            console.log("For loop ended");
        }
        // if mouse held don't keep restarting this
        console.log("ON MOUSE DOWN::CAN SELECT ELEMENTS: - " + can_select);
        if(can_select)
        {

            get_mouse_coords(event);

            //alert('mouse down: ' + mouse_x + ', ' + mouse_y);
            var ray = get_mouse_ray_wor (mouse_x, mouse_y);
            // plane intersection
            if (ray_plane (ray, g_cam.mWC_Pos, [0, 1, 0], 0)) 
            {
                //console.log ("ray hit");
            } else 
            {
                //console.log ("ray missed somehow");
            }

            for(var i = 1; i<zone_activity_array.length;i++)
    //                    for(var i = 9; i<10;i++)
            {
                var x = intersection_point_wor_x + 1000;
                var y = intersection_point_wor_y + 1000;
                var x1 = parseFloat(zone_activity_array[i].p1X)+ 1000;
                var x2 = parseFloat(zone_activity_array[i].p2X) + 1000;
                var y1 = parseFloat(zone_activity_array[i].p1Y) + 1000;
                var y2 = parseFloat(zone_activity_array[i].p2Y) + 1000;

                if (x < Math.max (x1, x2) && x >= Math.min (x1, x2) && y < Math.max (y1, y2) && y >= Math.min (y1, y2)) 
                {

                    // when in loop of several sensors; deselect previous and select new

                    console.log("ON MOUSE DOWN::ZONE FOUND....SELECTING");
                    current_activity_zone = zone_activity_array[i];
                    update_sensor_checkbox();
                    document.getElementById('energy_consumption_display_div_id').value=current_activity_zone.id;
                    document.getElementById('energy_consumption_display_div').value=0+ ' kWh';
    //                            console.log(current_activity_zone.symbolic);
//                    document.forms["zone_form"]["zone_id_name"].value = current_activity_zone.id;
    //                            console.log(current_activity_zone.id);
//                    document.forms["zone_form"]["symbolic_name"].value = current_activity_zone.symbolic;
                    zone_selected = true;
                    console.log("ZONE SELECTED - " + zone_selected);

    //                            can_create_zone = false;
                    current_path_node_array = new Array();
                    path_selected = false;
                    can_view_path_id = false;
    //                            set_zone_form_values();
    //                            update_occupancy_chart();

                } 
                else                     
                {
                    //alert('zone_deselected()');
                }
            }
    //                    console.log("LENGTH: " + path_node_array.length);
            for(var i = 0; i<path_node_array.length;i++)
            {
    //                        console.log("LENGTH: " + path_node_array[i].length);
                for(var j = 0; j<path_node_array[i].length-2;j++)
                {

                    var polygon = new Polygon();
                    var point = new Point(path_node_array[i][j].p1X, path_node_array[i][j].p1Y-2);
                    polygon.add(point);
                    var point = new Point(path_node_array[i][j].p1X, path_node_array[i][j].p1Y+2);
                    polygon.add(point);
                    var point = new Point(path_node_array[i][j+1].p1X, path_node_array[i][j+1].p1Y+2);
                    polygon.add(point);
                    var point = new Point(path_node_array[i][j+1].p1X, path_node_array[i][j+1].p1Y-2);
                    polygon.add(point);
                    point = new Point(intersection_point_wor_x, intersection_point_wor_y);


                    if((polygon.pointInPoly(point)))
                    {
    //                                console.log(current_path_node_array.length);
                        if(current_path_node_array.length===0)
                        {
                            console.log("ON MOUSE DOWN::PATH FOUND AND SELECTED");
                            current_path_node_array = path_node_array[i];
                            console.log(path_node_array[i][0].activity_zone_id);
                            path_exit_id = current_path_node_array[0].activity_zone_id;
                            path_entry_id = current_path_node_array[current_path_node_array.length-1].activity_zone_id;
                            path_selected = true;
                            can_view_path_id = true;
                            set_zone_form_values();
                        }
                        else if(current_path_node_array[0].path_id!==path_node_array[i][0].path_id)
                        {
                            console.log("ON MOUSE DOWN::PATH FOUND AND SELECTED");
                            current_path_node_array = path_node_array[i];
                            path_exit_id = current_path_node_array[0].activity_zone_id;
                            path_entry_id = current_path_node_array[current_path_node_array.length-1].activity_zone_id;
                            path_selected = true;
                            can_view_path_id = true;
                            set_zone_form_values();
                        }
                        current_activity_zone = new Array(); //Double check why you set this as an array???
                        zone_selected = false;
                        console.log("ZONE SELECTED - " + zone_selected);

                    } 
                    else                     
                    {
    //                                console.log('No Path Selected!!!');
                    }
                }
            }
        }

        /*
         * MOUSE DOWN - CREATING A ZONE
         */
        console.log("ON MOUSE DOWN::CAN CREATE ZONE : - " + can_create_zone);
        console.log("ON MOUSE DOWN::CAN SELECT : - " + can_select);
        if(can_create_zone&&!can_select)
        {
            console.log("ON MOUSE DOWN::IS ZONE BEING BUILT : - " + g_zone_is_being_built);
            current_activity_zone = new Zone('Activity', 0, 0,0,0,  0,0,0, "Office"); //Create an empty zone for the current zone
            if (g_zone_is_being_built) 
            {
                    return;
            }
            // note that the following are offset by the page - so the top-left pixel has value
            // of around 8,8. so next we will subtract document, window, etc. offset (grr...)

            // recursively get location within parent(s)
            get_mouse_coords(event);

            //alert('mouse down: ' + mouse_x + ', ' + mouse_y);
            var ray = get_mouse_ray_wor (mouse_x, mouse_y);
            // plane intersection
            if (ray_plane (ray, g_cam.mWC_Pos, [0, 1, 0], 0)) 
            {
                //console.log ("ray hit");
            } 
            else 
            {
                //console.log ("ray missed somehow");
            }

            current_activity_zone.id = create_simple_guid();
            current_activity_zone.p1X = intersection_point_wor_x;
            current_activity_zone.p1Y = intersection_point_wor_y;
            current_activity_zone.p1Z = intersection_point_wor_z;

            current_activity_zone.p2X = intersection_point_wor_x;
            current_activity_zone.p2Y = intersection_point_wor_y;
            current_activity_zone.p2Z = intersection_point_wor_z;

            g_zone_is_being_built = true;
            can_create_zone = false;
            console.log("ZONE CREATED");
        }

    }

    g_canvas.onmousemove = function (event) 
    {

        var element = g_canvas;
        var top = 0;
        var left = 0;
        while (element && element.tagName != 'BODY') {
                top += element.offsetTop;
                left += element.offsetLeft;
                element = element.offsetParent;
        }
        // adjust for scrolling
        left += window.pageXOffset;
        top -= window.pageYOffset;
        g_mouse_x = event.clientX - left;
        g_mouse_y = (event.clientY - top);
        // sometimes range is a few pixels too big
        if (g_mouse_x >= g_canvas.width) {
                return;
        }
        if (g_mouse_y >= g_canvas.height) {
                return;
        }

        if(can_create_zone||can_create_path){

            if (g_zone_is_being_built||can_create_path) {
                //console.log(can_create_path);
                var element = g_canvas;
                var top = 0;
                var left = 0;
                while (element && element.tagName != 'BODY') {
                        top += element.offsetTop;
                        left += element.offsetLeft;
                        element = element.offsetParent;
                }
                // adjust for scrolling
                left += window.pageXOffset;
                top -= window.pageYOffset;
                g_mouse_x = event.clientX - left;
                g_mouse_y = (event.clientY - top);
                // sometimes range is a few pixels too big
                if (g_mouse_x >= gl.viewportWidth) {
                        return;
                }
                if (g_mouse_y >= gl.viewportHeight) {
                        return;
                }
                //console.log ("move move: " + g_mouse_x + " " + g_mouse_y);
            }
        }
    }
    // do at document level so if dragging and mouse goes out window, can still let go of box
    document.onmouseup = function (event) {

        // for cam gui
        g_mouse_down = false;
        g_height_clicky_held_down = false;

        // note that the following are offset by the page - so the top-left pixel has value
        // of around 8,8. so next we will subtract document, window, etc. offset (grr...)
        if(can_create_zone&&g_zone_is_being_built)
        {
            // recursively get location within parent(s)
            get_mouse_coords(event);

            console.log ('mouse down: ' + mouse_x + ', ' + mouse_y);
            get_mouse_ray_wor (mouse_x, mouse_y);
            // plane intersection 
            current_activity_zone.p2X = intersection_point_wor_x;
            current_activity_zone.p2Y = intersection_point_wor_y;
            current_activity_zone.p2Z = intersection_point_wor_z;

            save_zone();


            //alert(zone_activity_array[0].getInfo())
            //console.log ("zone end = " + last_intersection_point);
        }
        if(can_create_path)
        {

            if(!can_save_path)
            {
                get_mouse_coords(event);
                get_mouse_ray_wor (mouse_x, mouse_y);
                current_path_node_array[current_path_node_array.length-1] = new PathNode(current_path_node.path_id, current_path_node.p1X, current_path_node.p1Y, current_path_node.p1Z, current_path_node.activity_path_id);                   
                current_path_node_array.push(current_path_node);
                console.log("CURRENT PATH NODE ARRAY LENGTH" + current_path_node_array.length);

            }
            else if(can_save_path)
            {         
                //state_booleans();
                console.log("SAVING PATH TO ARRAY OF PATHS");
                current_path_node_array[current_path_node_array.length-1] = new PathNode(current_path_node.path_id, current_path_node.p1X, current_path_node.p1Y, current_path_node.p1Z, current_path_node.activity_path_id);
                save_path();
                //can_create_path = false;

            }

        }

    }
}

function handle_keyboard_input (step_size) {
    var cam_move = [0, 0, 0];
    var camspeed = 20.0;
    var keyed = false;
    if(!web_gl_disable_keyboard)
        {

            if (currentlyPressedKeys[87] === true) 
            { // w
                cam_move[2] = -1.0 * camspeed * step_size;
                g_cam.move_cam_relative_forward_by (cam_move);
                keyed = true;
            }
            if (currentlyPressedKeys[83] === true) 
            { // s
                cam_move[2] = 1.0 * camspeed * step_size;
                g_cam.move_cam_relative_forward_by (cam_move);
                keyed = true;
            }
            if (currentlyPressedKeys[65] === true) 
            { // a
                    cam_move[0] = -1.0 * camspeed * step_size;
                    g_cam.move_cam_relative_sideways_by (cam_move);
                    keyed = true;
            }
            if (currentlyPressedKeys[68] === true) 
            { // d
                    cam_move[0] = 1.0 * camspeed * step_size;
                    g_cam.move_cam_relative_sideways_by (cam_move);
                    keyed = true;
            }
            if (currentlyPressedKeys[69] === true) 
            { // q
                    cam_move[1] = -1.0 * camspeed * step_size;
                    g_cam.moveBy (cam_move);
                    keyed = true;
            }
            if (currentlyPressedKeys[81] == true) 
            { // r
                    cam_move[1] = 1.0 * camspeed * step_size;
                    g_cam.moveBy (cam_move);
                    keyed = true;
            }
            if (currentlyPressedKeys[84] === true) // T to pitch
            { 
                g_cam.change_attitude (-20.0, step_size); 
            }
             else if (currentlyPressedKeys[71] === true)  //G to pitch Up
            { 
                g_cam.change_attitude (20.0, step_size);
            }
            // F key to yaw left
            if (currentlyPressedKeys[70] === true)   
            {
                g_cam.change_heading (40.0, step_size);  
                                                // H key to yaw right    	
            } else if (currentlyPressedKeys[72] === true)      
            { 
                g_cam.change_heading (-40.0, step_size);     
            }
        }
    if (currentlyPressedKeys[46] === true) // //Delete Key
        {
            delete_zone();
        }

        // keys listed by code: http://stackoverflow.com/questions/1465374/javascript-event-keycode-constants
        if (currentlyPressedKeys[77] === true) // M to select a wall
        {
            can_select_wall = true;
        }            

        if (currentlyPressedKeys[80] === true) // T to pitch
        { 
            console.log("zone_activity_array.length: " + zone_activity_array.length);
            for(var i = 0;i<zone_activity_array.length;i++)
            {
                console.log("zone_activity_array pos " + i + " has id " + zone_activity_array[i].id);
            }
            console.log("path_node_array.length: " + path_node_array.length);
            for(var i = 0;i<path_node_array.length;i++)
            {
                console.log("path_node_array pos " + i + " has first node id " + path_node_array[i][0].path_id);
            }    
            currentlyPressedKeys[80] = false;
        }
//            console.log("currentlyPressedKeys[90]: "+ currentlyPressedKeys[90]);
        if (currentlyPressedKeys[90] === true) // z
        {   

            if(can_create_zone===false)
            {   

                can_create_zone = true;
                choose_activity_dropdown();
                console.log("Z PRESSED AND can_create_zone is false - SETTING can_create_zone to: "+can_create_zone);
//                    currentlyPressedKeys[90] = false;
            }

        }
        else 
        {
            if(can_create_zone===true)
            {   
                can_create_zone = false;
                console.log("Z NOT PRESSED AND can_create_zone is true - SETTING can_create_zone to: "+can_create_zone);
            }
//                currentlyPressedKeys[90] = false;
        }
        if(!web_gl_disable_keyboard)
        {
            if (currentlyPressedKeys[88] === true) //x 'x' "x"
            { 
                if(can_select===false)
                {                
                    can_select = true;
                    console.log("X PRESSED AND can_select is false - SETTING can_select to: "+can_select);
                }
            }
            else 
            {
                if(can_select===true)
                {   
                    can_select = false;
                    console.log("X NOT PRESSED AND can_select is true - SETTING can_select to: "+can_select);
                }
            }
        }
        if (currentlyPressedKeys[86] === true) //c
        { 
            console.log("V PRESSED AND path_node_array.length is : "+path_node_array.length);
            if(path_node_array.length===0)
            {
                console.log("V PRESSED AND PATH NODE ARRAY IS EMPTY. PUSHING current_path_node_array ONTO path_node_array");
                path_node_array.push(current_path_node_array);

            }
            console.log("V PRESSED AND zone_selected is: "+zone_selected);
            console.log("V PRESSED AND path_selected is: "+path_selected);
            if((zone_selected === true)&&(path_selected!==true))
            {

                console.log("V PRESSED AND zone_selected IS TRUE AND path_selected IS FALSE- SETTING can_create_path to TRUE");
                can_create_path = true;
                console.log("SETTING path_exit_id to undefined UNTIL PATH IS CREATED");
                path_exit_id = "undefined";

                console.log("V PRESSED AND set_start_path_id is: "+set_start_path_id);
                if(set_start_path_id===false)
                {
                    console.log("V PRESSED AND set_start_path_id is FALSE, SETTING to TRUE, SETTING path_entry_id to current_activity_zone.id");
                    path_entry_id = current_activity_zone.id;
                    set_start_path_id = true;
                }

                console.log("V PRESSED AND SETTING FIRST NODE AS ORIGIN OF ZONE current_path_node_array LENGTH: " + current_path_node_array.length);

                first_path_node = new PathNode();
                first_path_node.p1X = midpoint(current_activity_zone.p1X, current_activity_zone.p2X);
                first_path_node.p1Y = midpoint(current_activity_zone.p1Y, current_activity_zone.p2Y);
                first_path_node.p1Z = midpoint(current_activity_zone.p1Z, current_activity_zone.p2Z);
                first_path_node.has_activity_node_id = current_activity_zone.id;
                //console.log(first_path_node.has_activity_node_id);
                first_path_node.path_id = create_simple_guid();

                if(current_path_node_array.length===0)
                {
                    console.log("V PRESSED AND CURRENT_PATH_NODE_ARRAY was EMPTY");
                    current_path_node_array.push(first_path_node); //pointer to first_path_node storing midpoint of first activity zone
                    current_path_node_array.push(current_path_node); //pointer to current_path_node which is updated below
                    console.log("V PRESSED current_path_node_array LENGTH: " + current_path_node_array.length);
                    console.log("V PRESSED current_path_node_array[0].id: " + current_path_node_array[0].id);

                    console.log("V PRESSED SETTING CAN_VIEW_PATH_ID to TRUE");
                    can_view_path_id = true;
                }
            }
            
            else 
            {
                if(!web_gl_disable_keyboard)
                {
                    
                alert("You must select a start zone for the path (PRESS X to select a Zone)");
                currentlyPressedKeys[86] = false;

                //update_path();
                }
            }
        }

        else 
        {

        }
//                if (currentlyPressedKeys[88] == true) { // w
//
//                    save_zone();
//  
//                }

        // show dragging-out of zone with mouse is still held
        if (g_zone_is_being_built) {
        //if(true){
            // recursively get location within parent(s)
            var ray = get_mouse_ray_wor (g_mouse_x, g_mouse_y);

            if (ray_plane (ray, g_cam.mWC_Pos, [0, 1, 0], 0)) {

            }

            current_activity_zone.p2X = intersection_point_wor_x;
            current_activity_zone.p2Y = intersection_point_wor_y;
            current_activity_zone.p2Z = intersection_point_wor_z;

        }

        if (can_create_path) 
        {

                var ray = get_mouse_ray_wor (g_mouse_x, g_mouse_y);

                if (ray_plane (ray, g_cam.mWC_Pos, [0, 1, 0], 0)) 
                {

                }
                var apos;
                for(var i = 1; i<zone_activity_array.length;i++)
                {
//                        (x < Math.max (x1, x2) && x >= Math.min (x1, x2) && y < Math.max (y1, y2) && y >= Math.min (y1, y2))
                    if((intersection_point_wor_x < Math.max (zone_activity_array[i].p1X, zone_activity_array[i].p2X)) && (intersection_point_wor_x >= Math.min (zone_activity_array[i].p1X, zone_activity_array[i].p2X))
                            && (intersection_point_wor_y < Math.max (zone_activity_array[i].p1Y, zone_activity_array[i].p2Y)) && (intersection_point_wor_y >= Math.min (zone_activity_array[i].p1Y, zone_activity_array[i].p2Y)))
//                        if(((intersection_point_wor_x>zone_activity_array[i].p1X)&&(intersection_point_wor_y>zone_activity_array[i].p1Y))
//                            &&((intersection_point_wor_x<zone_activity_array[i].p2X)&&(intersection_point_wor_y<zone_activity_array[i].p2Y)))
                    {

                        path_connected = true;
                        can_save_path = true;
//                            can_select_zone = false;
//                            zone_selected = false;
                        //console.log(path_connected);
                        apos = i;

                    } 

                }
                if(!path_connected)                     
                {

                    current_path_node.p1X = intersection_point_wor_x;
                    current_path_node.p1Y = intersection_point_wor_y;
                    current_path_node.p1Z = intersection_point_wor_z;
                    current_path_node.path_id = create_simple_guid();
                    current_path_node.activity_path_id = current_activity_zone.id;
//                        console.log(current_path_node.activity_path_id);

                    can_save_path = false;
//                        if(path_node_array)
//                        {
//                            console.log(path_node_array[path_node_array.length][0].p1X);
//                            
//                        }
                    //console.log(path_connected);
                }
                if(path_connected)                     
                {                          
                    current_path_node.p1X = midpoint(zone_activity_array[apos].p1X, zone_activity_array[apos].p2X);
                    current_path_node.p1Y = midpoint(zone_activity_array[apos].p1Y, zone_activity_array[apos].p2Y);
                    current_path_node.p1Z = midpoint(zone_activity_array[apos].p1Z, zone_activity_array[apos].p2Z);
                    current_path_node.path_id = create_simple_guid(); //
                    current_path_node.activity_path_id = zone_activity_array[apos].id;
                    //current_path_node.has_activity_node_id = zone_activity_array[apos].id;
                    //
                    path_exit_id = current_path_node.activity_path_id;                     
                    path_connected = false;



                    //console.log(path_connected);
                }

//                    console.log("SETTING CURRENT PATH NODE AS MOUSE POSITION");
//                    console.log("X = " + intersection_point_wor_x);
//                    console.log("Previous path X = " + previous_path_node.p1X); 

        }
    return keyed;
}
