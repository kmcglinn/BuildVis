var floor_vs_url = "shaders/ground_vs.glsl";
var floor_fs_url = "shaders/ground_fs.glsl";

// floor plane globals
var g_floor_vp_vbo;
var g_floor_vt_vbo;
var g_floor_tex;
var g_floor_shader;
var g_floor_vp_loc;
var g_floor_vt_loc;
var g_floor_view_mat_loc;
var g_floor_proj_mat_loc;

// load stuff
function init_floor () {
	// load floor image file into texture
	g_floor_tex = gl.createTexture ();
	var floor_img = new Image ();
	floor_img.onload = function () {
		gl.bindTexture (gl.TEXTURE_2D, g_floor_tex);
		gl.texImage2D (
			gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, floor_img
		);
		gl.texParameteri (
			gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR
		);
  	gl.generateMipmap (gl.TEXTURE_2D);
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	}
	floor_img.src = "images/grid.png";
	
	// ground plane geometry
	var ground_plane_vp = [
		-70.0, -10.0,
		-70.0,  110.0,
		 10.0,  110.0,
		 10.0,  110.0,
		 10.0, -10.0,
		-70.0, -10.0
	];
	var ground_plane_vt = [
		0.0, 1.0,
		0.0, 0.0,
		1.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0
	];
	g_floor_vp_vbo = create_vbo (ground_plane_vp);
	g_floor_vt_vbo = create_vbo (ground_plane_vt);
	
	// shader
	g_floor_shader = load_shaders (floor_vs_url, floor_fs_url);
	g_floor_vp_loc = gl.getAttribLocation (g_floor_shader, "vp");
	g_floor_vt_loc = gl.getAttribLocation (g_floor_shader, "vt");
	g_floor_view_mat_loc = gl.getUniformLocation (g_floor_shader, "view_mat");
	g_floor_proj_mat_loc = gl.getUniformLocation (g_floor_shader, "proj_mat");
	var ctex = gl.getUniformLocation (g_floor_shader, "tex");
	gl.useProgram (g_floor_shader);
	gl.uniform1i (ctex, 0);
	// set defaults - assume cam is already set up
	update_floor_cam_mats ();
}

function update_floor_cam_mats () {
	gl.useProgram (g_floor_shader);
	gl.uniformMatrix4fv (
		g_floor_view_mat_loc, false, transpose_mat4 (g_cam.mViewMat)
	);
	gl.uniformMatrix4fv (
		g_floor_proj_mat_loc, false, transpose_mat4 (g_cam.mProjMat)
	);
}

function render_floor () {
	gl.activeTexture (gl.TEXTURE0);
	gl.bindTexture (gl.TEXTURE_2D, g_floor_tex);
	
	gl.useProgram (g_floor_shader);

	gl.enableVertexAttribArray (0);
	gl.bindBuffer (gl.ARRAY_BUFFER, g_floor_vp_vbo);
  gl.vertexAttribPointer (g_floor_vp_loc, 2, gl.FLOAT, false, 0, 0);
  
  gl.enableVertexAttribArray (1);
  gl.bindBuffer (gl.ARRAY_BUFFER, g_floor_vt_vbo);
  gl.vertexAttribPointer (g_floor_vt_loc, 2, gl.FLOAT, false, 0, 0);
  
  gl.drawArrays (gl.TRIANGLES, 0, 6);
  
  gl.disableVertexAttribArray (1);
}
