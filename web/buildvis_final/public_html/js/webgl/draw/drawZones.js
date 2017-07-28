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

// vertex buffer
var g_zone_vbo;
// shader programme
var g_zone_sp;


function populate_occupied_zone_points(){

    zone_occupied_points = new Array();
    var set_z = 0.1;
    for(var i = 18;  i< zone_activity_array.length*18; i=i+18)
    {
        a_z_count = i/18;
//        console.log(zone_activity_array[a_z_count].occupied);
        if(zone_activity_array[a_z_count].occupied===1)
        {   
//            console.log(zone_activity_array[a_z_count].symbolic + " occupied " + zone_activity_array[a_z_count].occupied);
            zone_occupied_points[i] = zone_activity_array[a_z_count].p1X;
            zone_occupied_points[i+1] = set_z;
            zone_occupied_points[i+2] = zone_activity_array[a_z_count].p1Y;

            zone_occupied_points[i+3] = zone_activity_array[a_z_count].p2X;
            zone_occupied_points[i+4] = set_z;
            zone_occupied_points[i+5] = zone_activity_array[a_z_count].p1Y;

            zone_occupied_points[i+6] = zone_activity_array[a_z_count].p2X;
            zone_occupied_points[i+7] = set_z;
            zone_occupied_points[i+8] = zone_activity_array[a_z_count].p2Y;

            zone_occupied_points[i+9] = zone_activity_array[a_z_count].p1X;
            zone_occupied_points[i+10] = set_z;
            zone_occupied_points[i+11] = zone_activity_array[a_z_count].p1Y;

            zone_occupied_points[i+12] = zone_activity_array[a_z_count].p2X;
            zone_occupied_points[i+13] = set_z;
            zone_occupied_points[i+14] = zone_activity_array[a_z_count].p2Y;

            zone_occupied_points[i+15] = zone_activity_array[a_z_count].p1X;
            zone_occupied_points[i+16] = set_z;
            zone_occupied_points[i+17] = zone_activity_array[a_z_count].p2Y;
        }
        else 
        {
//            console.log(zone_activity_array[a_z_count].type);
        }
    }

}

function populate_zone_points(){
    
    if(current_activity_type==="Activity")
    {
        current_zone_points = [
        current_activity_zone.p1X,0.1,current_activity_zone.p1Y,
        current_activity_zone.p2X,0.1,current_activity_zone.p1Y,
        current_activity_zone.p2X,0.1,current_activity_zone.p2Y,
        current_activity_zone.p1X,0.1,current_activity_zone.p1Y,
        current_activity_zone.p2X,0.1,current_activity_zone.p2Y,
        current_activity_zone.p1X,0.1,current_activity_zone.p2Y
        ];
    }
    else if(current_activity_type==="Path")
    {
        current_zone_points = [
        current_activity_zone.p1X,0.1,current_activity_zone.p1Y,
        current_activity_zone.p2X,0.1,current_activity_zone.p1Y,
        current_activity_zone.p2X,0.1,current_activity_zone.p2Y,
        current_activity_zone.p1X,0.1,current_activity_zone.p1Y,
        current_activity_zone.p2X,0.1,current_activity_zone.p2Y,
        current_activity_zone.p1X,0.1,current_activity_zone.p2Y
        ];
    }

    var set_z = 0.1;
    for(var i = 18;  i< zone_activity_array.length*18; i=i+18)
    {
        a_z_count = i/18;
        if(zone_activity_array[a_z_count].type==="Activity")
        {   
            zone_activity_points[i] = zone_activity_array[a_z_count].p1X;
            zone_activity_points[i+1] = set_z;
            zone_activity_points[i+2] = zone_activity_array[a_z_count].p1Y;

            zone_activity_points[i+3] = zone_activity_array[a_z_count].p2X;
            zone_activity_points[i+4] = set_z;
            zone_activity_points[i+5] = zone_activity_array[a_z_count].p1Y;

            zone_activity_points[i+6] = zone_activity_array[a_z_count].p2X;
            zone_activity_points[i+7] = set_z;
            zone_activity_points[i+8] = zone_activity_array[a_z_count].p2Y;

            zone_activity_points[i+9] = zone_activity_array[a_z_count].p1X;
            zone_activity_points[i+10] = set_z;
            zone_activity_points[i+11] = zone_activity_array[a_z_count].p1Y;

            zone_activity_points[i+12] = zone_activity_array[a_z_count].p2X;
            zone_activity_points[i+13] = set_z;
            zone_activity_points[i+14] = zone_activity_array[a_z_count].p2Y;

            zone_activity_points[i+15] = zone_activity_array[a_z_count].p1X;
            zone_activity_points[i+16] = set_z;
            zone_activity_points[i+17] = zone_activity_array[a_z_count].p2Y;
        }
        else if(zone_activity_array[a_z_count].type==="Path")
        {   
            zone_path_points[i] = zone_activity_array[a_z_count].p1X;
            zone_path_points[i+1] = set_z;
            zone_path_points[i+2] = zone_activity_array[a_z_count].p1Y;

            zone_path_points[i+3] = zone_activity_array[a_z_count].p2X;
            zone_path_points[i+4] = set_z;
            zone_path_points[i+5] = zone_activity_array[a_z_count].p1Y;

            zone_path_points[i+6] = zone_activity_array[a_z_count].p2X;
            zone_path_points[i+7] = set_z;
            zone_path_points[i+8] = zone_activity_array[a_z_count].p2Y;

            zone_path_points[i+9] = zone_activity_array[a_z_count].p1X;
            zone_path_points[i+10] = set_z;
            zone_path_points[i+11] = zone_activity_array[a_z_count].p1Y;

            zone_path_points[i+12] = zone_activity_array[a_z_count].p2X;
            zone_path_points[i+13] = set_z;
            zone_path_points[i+14] = zone_activity_array[a_z_count].p2Y;

            zone_path_points[i+15] = zone_activity_array[a_z_count].p1X;
            zone_path_points[i+16] = set_z;
            zone_path_points[i+17] = zone_activity_array[a_z_count].p2Y;
        }
        else 
        {
            console.log(zone_activity_array[a_z_count].type);
        }
    }

}
function draw_current_zone(){
        

    populate_zone_points();
    
    zone_vp_vbo = create_vbo(current_zone_points);
    zone_v_count = current_zone_points.length/3;
    
    gl.disable (gl.CULL_FACE); // enable culling
    
        gl.enable(gl.BLEND);
               
            gl.disable(gl.DEPTH_TEST);
            gl.useProgram (zone_shader);
            if(current_activity_type==="Activity")
            {
        //        set_zone_green ();
                gl.uniform3f (g_zone_shader_colour_loc, 0.137255,0.556863,0.137255);

            }
            else if(current_activity_type==="Path")
            {
        //        set_zone_red ();
                gl.uniform3f (g_zone_shader_colour_loc, 1, 0, 0);
            }

            gl.enableVertexAttribArray (0);
            gl.disableVertexAttribArray (1);

            gl.bindBuffer (gl.ARRAY_BUFFER, zone_vp_vbo);
            gl.vertexAttribPointer (0, 3, gl.FLOAT, false, 0, 0);
            //@todo-for each zone...
            // render one zone for the minute
            //gl.uniformMatrix4fv (zone_M_loc, false, transpose_mat4 (zone_a_M));
            gl.uniformMatrix4fv (zone_V_loc, false, transpose_mat4 (g_cam.mViewMat));
            gl.uniformMatrix4fv (zone_P_loc, false, transpose_mat4 (g_cam.mProjMat));

            //gl.uniform4f (zone_colour_loc, 0.2, 0.2, 0.2, 1.0);
//            console.log(zone_v_count);
            gl.drawArrays (gl.TRIANGLES, 0, zone_v_count);
            
            gl.enable(gl.DEPTH_TEST);
            
        gl.disable(gl.BLEND);

    gl.enable (gl.CULL_FACE); // enable culling


}
function draw_activity_zones(){
        
    //set_zone_green(); 
    
//    populate_zone_points();

    zone_vp_vbo = create_vbo(zone_activity_points);
    zone_v_count = zone_activity_points.length/3;
    

    gl.disable (gl.CULL_FACE); // enable culling
    
        gl.enable(gl.BLEND);
        
//        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        
            gl.disable(gl.DEPTH_TEST);
            gl.useProgram (zone_shader);
            gl.uniform3f (g_zone_shader_colour_loc, 0.137255,0.556863,0.137255);
            gl.enableVertexAttribArray (0);
            gl.disableVertexAttribArray (1);

            gl.bindBuffer (gl.ARRAY_BUFFER, zone_vp_vbo);
            gl.vertexAttribPointer (0, 3, gl.FLOAT, false, 0, 0);
            //@todo-for each zone...
            // render one zone for the minute
            //gl.uniformMatrix4fv (zone_M_loc, false, transpose_mat4 (zone_a_M));
            gl.uniformMatrix4fv (zone_V_loc, false, transpose_mat4 (g_cam.mViewMat));
            gl.uniformMatrix4fv (zone_P_loc, false, transpose_mat4 (g_cam.mProjMat));

            //gl.uniform4f (zone_colour_loc, 0.2, 0.2, 0.2, 1.0);
//            console.log(zone_v_count);
            gl.drawArrays (gl.TRIANGLES, 0, zone_v_count);
            
            gl.enable(gl.DEPTH_TEST);
            
        gl.disable(gl.BLEND);

    gl.enable (gl.CULL_FACE); // enable culling


}


function draw_occupied_zones(){
        
    populate_occupied_zone_points();
    
    zone_vp_vbo = create_vbo(zone_occupied_points);
    zone_v_count = zone_occupied_points.length/3;
    

    gl.disable (gl.CULL_FACE); // enable culling
    
        gl.enable(gl.BLEND);
        
//        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        
            gl.disable(gl.DEPTH_TEST);
            gl.useProgram (zone_shader);
            gl.uniform3f (g_zone_shader_colour_loc, 0.0,0.0,1.0);
            gl.enableVertexAttribArray (0);
            gl.disableVertexAttribArray (1);

            gl.bindBuffer (gl.ARRAY_BUFFER, zone_vp_vbo);
            gl.vertexAttribPointer (0, 3, gl.FLOAT, false, 0, 0);
            //@todo-for each zone...
            // render one zone for the minute
            //gl.uniformMatrix4fv (zone_M_loc, false, transpose_mat4 (zone_a_M));
            gl.uniformMatrix4fv (zone_V_loc, false, transpose_mat4 (g_cam.mViewMat));
            gl.uniformMatrix4fv (zone_P_loc, false, transpose_mat4 (g_cam.mProjMat));

            //gl.uniform4f (zone_colour_loc, 0.2, 0.2, 0.2, 1.0);
//            console.log(zone_v_count);
            gl.drawArrays (gl.TRIANGLES, 0, zone_v_count);
            
            gl.enable(gl.DEPTH_TEST);
            
        gl.disable(gl.BLEND);

    gl.enable (gl.CULL_FACE); // enable culling


}


function draw_path_zones(){
        
//    populate_path_zone_points();
//    set_zone_red(); 
    
    zone_vp_vbo = create_vbo(zone_path_points);
    zone_v_count = zone_path_points.length/3;

    gl.disable (gl.CULL_FACE); // enable culling
    
        gl.enable(gl.BLEND);
        
//        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        
            gl.disable(gl.DEPTH_TEST);
            gl.useProgram (zone_shader);
            gl.uniform3f (g_zone_shader_colour_loc, 1, 0, 0);
            gl.enableVertexAttribArray (0);
            gl.disableVertexAttribArray (1);

            gl.bindBuffer (gl.ARRAY_BUFFER, zone_vp_vbo);
            gl.vertexAttribPointer (0, 3, gl.FLOAT, false, 0, 0);
            //@todo-for each zone...
            // render one zone for the minute
            //gl.uniformMatrix4fv (zone_M_loc, false, transpose_mat4 (zone_a_M));
            gl.uniformMatrix4fv (zone_V_loc, false, transpose_mat4 (g_cam.mViewMat));
            gl.uniformMatrix4fv (zone_P_loc, false, transpose_mat4 (g_cam.mProjMat));

            //gl.uniform4f (zone_colour_loc, 0.2, 0.2, 0.2, 1.0);
//            console.log(zone_v_count);
            gl.drawArrays (gl.TRIANGLES, 0, zone_v_count);
            
            gl.enable(gl.DEPTH_TEST);
            
        gl.disable(gl.BLEND);

    gl.enable (gl.CULL_FACE); // enable culling


}
function populate_path_node_points(){
    
    var set_z = 0;
    var path_width = 1.0;

    path_node_points = new Array();
//    console.log("path_node_array length is: " + path_node_array.length);
    //var array_length = 0;
    for(var j = 0;  j< path_node_array.length; j++){
//        console.log("path_node_array at position: " + j + " has length: "+ path_node_array[j].length);
        for(var i = 0;  i< (path_node_array[j].length - 1)*18; i=i+18){
            p_n_count = i/18;
            // a
            path_node_points.push (path_node_array[j][p_n_count].p1X);
            path_node_points.push (set_z); // bottom
            path_node_points.push (path_node_array[j][p_n_count].p1Y);
            // b.just vertically up 1m from a
            path_node_points.push (path_node_array[j][p_n_count].p1X);
            path_node_points.push (path_width); // top
            path_node_points.push (path_node_array[j][p_n_count].p1Y);
            // c 
            path_node_points.push (path_node_array[j][p_n_count + 1].p1X);
            path_node_points.push (path_width); // top
            path_node_points.push (path_node_array[j][p_n_count + 1].p1Y);
            // d is just c again
            path_node_points.push (path_node_array[j][p_n_count + 1].p1X);
            path_node_points.push (path_width); // top
            path_node_points.push (path_node_array[j][p_n_count + 1].p1Y);
            // e is a new vertex, just vertically down from d
            path_node_points.push (path_node_array[j][p_n_count + 1].p1X);
            path_node_points.push (set_z); // top
            path_node_points.push (path_node_array[j][p_n_count + 1].p1Y);
            // f is just a again
            path_node_points.push (path_node_array[j][p_n_count].p1X);
            path_node_points.push (set_z); // bottom
            path_node_points.push (path_node_array[j][p_n_count].p1Y);
        }
        //array_length = path_node_points.length;
    }
    
}


function draw_path(){

    populate_path_node_points();

    //The last node on the array is alway the current node (when creating paths) otherwise
    path_vp_vbo = create_vbo(path_node_points);
    path_v_count = path_node_points.length/3;


    gl.disable (gl.CULL_FACE); // enable culling

        gl.enable(gl.BLEND);

//        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

            gl.disable(gl.DEPTH_TEST);

                gl.useProgram (path_shader);

                gl.enableVertexAttribArray (0);
                gl.disableVertexAttribArray (1);

                gl.bindBuffer (gl.ARRAY_BUFFER, path_vp_vbo);
                gl.vertexAttribPointer (0, 3, gl.FLOAT, false, 0, 0);
                //@todo-for each zone...
                // render one zone for the minute
                //gl.uniformMatrix4fv (zone_M_loc, false, transpose_mat4 (zone_a_M));
                gl.uniformMatrix4fv (path_V_loc, false, transpose_mat4 (g_cam.mViewMat));
                gl.uniformMatrix4fv (path_P_loc, false, transpose_mat4 (g_cam.mProjMat));

                //gl.uniform4f (zone_colour_loc, 0.2, 0.2, 0.2, 1.0);
                gl.drawArrays (gl.TRIANGLES, 0, path_v_count);
            
            gl.enable(gl.DEPTH_TEST);
            
        gl.disable(gl.BLEND);
        
    gl.enable (gl.CULL_FACE); // enable culling

//        gl.disable(gl.BLEND);
//        gl.enable(gl.DEPTH_TEST);
}

function draw_current_path(){

    current_path_node_points = new Array();
    var set_z = 0.0;
    var path_width = 1.0;
//    console.log(current_path_node_array.length);
    for(var i = 0;  i< (current_path_node_array.length-1)*18; i=i+18){
        p_n_count = i/18;
        current_path_node_points.push (current_path_node_array[p_n_count].p1X);
        current_path_node_points.push (set_z); // bottom
        current_path_node_points.push (current_path_node_array[p_n_count].p1Y);
//        console.log(current_path_node_points[0]);
        // b.just vertically up 1m from a
        current_path_node_points.push (current_path_node_array[p_n_count].p1X);
        current_path_node_points.push (path_width); // top
        current_path_node_points.push (current_path_node_array[p_n_count].p1Y);
        // c 
        current_path_node_points.push (current_path_node_array[p_n_count + 1].p1X);
        current_path_node_points.push (path_width); // top
        current_path_node_points.push (current_path_node_array[p_n_count + 1].p1Y);
        // d is just c again
        current_path_node_points.push (current_path_node_array[p_n_count + 1].p1X);
        current_path_node_points.push (path_width); // top
        current_path_node_points.push (current_path_node_array[p_n_count + 1].p1Y);
        // e is a new vertex, just vertically down from d
        current_path_node_points.push (current_path_node_array[p_n_count + 1].p1X);
        current_path_node_points.push (set_z); // top
        current_path_node_points.push (current_path_node_array[p_n_count + 1].p1Y);
        // f is just a again
        current_path_node_points.push (current_path_node_array[p_n_count].p1X);
        current_path_node_points.push (set_z); // bottom
        current_path_node_points.push (current_path_node_array[p_n_count].p1Y);
    }
 
    //The last node on the array is alway the current node (when creating paths) otherwise
        path_vp_vbo = create_vbo(current_path_node_points);
	path_v_count = current_path_node_points.length/3;
        
    	gl.disable (gl.CULL_FACE); // enable culling
    	gl.useProgram (path_shader);
	
	gl.enableVertexAttribArray (0);
	gl.disableVertexAttribArray (1);
	
	gl.bindBuffer (gl.ARRAY_BUFFER, path_vp_vbo);
	gl.vertexAttribPointer (0, 3, gl.FLOAT, false, 0, 0);
	//@todo-for each zone...
	// render one zone for the minute
	//gl.uniformMatrix4fv (zone_M_loc, false, transpose_mat4 (zone_a_M));
	gl.uniformMatrix4fv (path_V_loc, false, transpose_mat4 (g_cam.mViewMat));
	gl.uniformMatrix4fv (path_P_loc, false, transpose_mat4 (g_cam.mProjMat));

        //gl.uniform4f (zone_colour_loc, 0.2, 0.2, 0.2, 1.0);
        gl.drawArrays (gl.TRIANGLES, 0, path_v_count);

	gl.enable (gl.CULL_FACE); // enable culling

}
