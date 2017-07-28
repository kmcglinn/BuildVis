var g_blinds_vs_url = "shaders/blinds_vs.glsl";
var g_blinds_fs_url = "shaders/blinds_fs.glsl";
var g_blinds_frame_json_url = "json/blinds_frame.json";
var g_blinds_insert_json_url = "json/blinds_insert.json";

var g_blinds_frame_vp_vbo = 0;
var g_blinds_insert_vp_vbo = 0;
var g_blinds_frame_vcount = 0;
var g_blinds_insert_vcount = 0;

var g_blinds_sp = 0;
var g_blinds_M_loc = 0;
var g_blinds_P_loc = 0;
var g_blinds_V_loc = 0;
var g_blinds_y_loc = 0;

var g_blinds_M = new Array ();
var g_blinds_y = new Array ();

var blind_count = 0;

function init_blinds () 

{
    
	console.log ("initialising blinds");
	g_blinds_sp = load_shaders (g_blinds_vs_url, g_blinds_fs_url);
	g_blinds_M_loc = gl.getUniformLocation (g_blinds_sp, "M");
	g_blinds_V_loc = gl.getUniformLocation (g_blinds_sp, "V");
	g_blinds_P_loc = gl.getUniformLocation (g_blinds_sp, "P");
	g_blinds_y_loc = gl.getUniformLocation (g_blinds_sp, "y");

	update_blinds_cam_mats ();

	var f_json = loadMeshFromJSON (g_blinds_frame_json_url);
	g_blinds_frame_vcount = f_json.mVertexPoints.length / 3;
	g_blinds_frame_vp_vbo = create_vbo (f_json.mVertexPoints);
//	g_blinds_frame_vp_vbo = create_vbo ([-100,10,0,0,10,100,100,10,-100]);

	var i_json = loadMeshFromJSON (g_blinds_insert_json_url);
	g_blinds_insert_vcount = i_json.mVertexPoints.length / 3;
	g_blinds_insert_vp_vbo = create_vbo (i_json.mVertexPoints);
	
	add_blind ([-43.725, 9.0, 30.0]);
	add_blind ([-43.725, 9.0, 32.0]);
	add_blind ([-43.725, 9.0, 34.0]);
	add_blind ([-43.725, 9.0, 36.0]);
//	add_blind ([-58.725, 1.0, 17.0]);
//	add_blind ([-58.725, 1.0, 21.0]);

	set_blind_y (0, 0.0);
	set_blind_y (1, 0.0);
	set_blind_y (2, 0.0);
	set_blind_y (3, 0.0);
}

function loadMeshFromJSON (url) {
	var json = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			json = eval ("(" + xmlhttp.responseText + ")");
			return json;
		}
	}
	xmlhttp.open("GET", url, false);
	xmlhttp.send(null);
	return json; // this wont execute
}

function update_blinds_cam_mats () {
	gl.useProgram (g_blinds_sp);
	gl.uniformMatrix4fv (
		g_blinds_V_loc, false, transpose_mat4 (g_cam.mViewMat)
	);
	gl.uniformMatrix4fv (
		g_blinds_P_loc, false, transpose_mat4 (g_cam.mProjMat)
	);	
}

function add_blind (world_pos) {
	var S = scale_mat4 (identity_mat4 (), [1.0, 1.0, 1.5]);
        var R = rotate_x_mat4_deg (S, 90.0);
//        var T = translate_mat4 (R, world_pos);
        R = rotate_y_mat4_deg (S, 90.0);
        var T = translate_mat4 (R, world_pos);

        g_blinds_M.push (T);
        g_blinds_y.push (0);
}

function set_blind_y (b_index, y) {
	g_blinds_y[b_index] = y;
}

function render_blinds () {
	gl.useProgram (g_blinds_sp);
	gl.enableVertexAttribArray (0);
	// update model mats
	for (var i = 0; i < g_blinds_M.length; i++) {
		gl.uniformMatrix4fv (
			g_blinds_M_loc, false, transpose_mat4 (g_blinds_M[i])
		);
		gl.uniform1f (g_blinds_y_loc, 0.0);
		gl.bindBuffer (gl.ARRAY_BUFFER, g_blinds_frame_vp_vbo);
		gl.vertexAttribPointer (0, 3, gl.FLOAT, false, 0, 0);
		gl.drawArrays (gl.TRIANGLES, 0, g_blinds_frame_vcount);
		
		// insert and y-offset
		gl.uniform1f (g_blinds_y_loc, g_blinds_y[i] * 2.0);
		gl.bindBuffer (gl.ARRAY_BUFFER, g_blinds_insert_vp_vbo);
		gl.vertexAttribPointer (0, 3, gl.FLOAT, false, 0, 0);
		gl.drawArrays (gl.TRIANGLES, 0, g_blinds_insert_vcount);
	}
        
        if(blind_count<300)
        {
            blind_count++;
        }
        else
        {
            if(g_blinds_y[0]===0)
            {
                g_blinds_y[0] = 1;
                g_blinds_y[1] = 1;
                g_blinds_y[2] = 1;
                g_blinds_y[3] = 1;
                
            }else 
            {
                g_blinds_y[0] = 0;
                g_blinds_y[1] = 0;
                g_blinds_y[2] = 0;
                g_blinds_y[3] = 0;
                
            }
            blind_count = 0;
        }
}
