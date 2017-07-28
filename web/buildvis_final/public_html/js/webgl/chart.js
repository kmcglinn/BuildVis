var line_vs_filename = "shaders/line_vs.glsl";
var line_fs_filename = "shaders/line_fs.glsl";
var chart_quad_vs_filename = "shaders/image_panel_vs.glsl";
var chart_quad_fs_filename = "shaders/image_panel_fs.glsl";
var line_sp = 0;
var	line_sp_pos_loc = -1;
var	line_sp_length_loc = -1;
var	line_sp_width_loc = -1;
var	line_sp_angle_loc = -1;
var line_sp_colour_loc = -1;
var overall_plot_scale_x = 0.8;
var overall_plot_scale_y = 0.8;
var line_vbo = 0;
var chart_fb = 0;
var chart_fb_tex = 0;
var chart_quad_vp_vbo = 0;
var chart_quad_vt_vbo = 0;
var chart_quad_sp = 0;
var chart_quad_M_loc = 0;
var chart_quad_V_loc = 0;
var chart_quad_P_loc = 0;

var plot_a_width = 10.0;
var plot_a_rgba = [0.4, 0.4, 0.8, 1.0];
var plot_b_width = 10.0;
var plot_b_rgba = [0.3, 0.6, 0.3, 1.0];
var chart_plot_a = new Array ();
var chart_plot_b = new Array ();
var chart_scale_xi = -1.0;
var chart_scale_xf = 1.0;
var chart_scale_yi = -1.0;
var chart_scale_yf = 1.0;

var font_index;
var title_text;
var xaxis_text;
var xaxis_zero;
var xaxis_five;
var yaxis_text;
var yaxis_zero;
var yaxis_five;
var label_green;
var label_blue;

var g_chart_image_width = 1024.0;
var g_chart_image_height = 1024.0;

function feed_plot_a (plot_a) {
	chart_plot_a = plot_a;
}

function feed_plot_b (plot_b) {
	chart_plot_b = plot_b;
}

function set_x_label (text) {
	change_text (xaxis_text, text, 0.255, 0.96);
}

function set_y_label (text) {
	change_text (yaxis_text, text, 0.0, 0.05);
}

function set_title (text) {
	change_text (title_text, text, 0.2, 0.005);
}

function set_chart_scale (xi, xf, yi, yf) {
	chart_scale_xi = xi;
	chart_scale_xf = xf;
	chart_scale_yi = yi;
	chart_scale_yf = yf;
	change_text (xaxis_zero, real_date[xi * 2], 0.035, 0.92);
	change_text (xaxis_five, real_date[xf * 2], 0.835, 0.92);
	change_text (yaxis_zero, yi.toString(), 0.0, 0.875);
	change_text (yaxis_five, yf.toString(), 0.0, 0.075);
}

function _create_line_shader_programme () {
	line_sp = load_shaders_from_files (line_vs_filename, line_fs_filename);
	
	line_sp_pos_loc = get_uniform_loc (line_sp, "pos");
	line_sp_length_loc = get_uniform_loc (line_sp, "length");
	line_sp_width_loc = get_uniform_loc (line_sp, "width");
	line_sp_angle_loc = get_uniform_loc (line_sp, "angle");
	line_sp_colour_loc = get_uniform_loc (line_sp, "colour");
}

function _create_line_vbo () {
	// default line is covering the whole screen - scale and rotate
	// NOTE y is 0-1 not +-1 so it rotates more easily around centre etc.
	var vp = [
		-1.0, 1.0,
		-1.0, 0.0,
		 1.0, 0.0,
		 1.0, 0.0,
		 1.0, 1.0,
		-1.0, 1.0
	];
	line_vbo = gl.createBuffer ();
        gl.bindBuffer (gl.ARRAY_BUFFER, line_vbo);
	gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vp), gl.STATIC_DRAW);
}

function _create_chart_quad () {
	var vp = [
		-1.0,  1.0,
		-1.0, -1.0,
		 1.0, -1.0,
		 1.0, -1.0,
		 1.0,  1.0,
		-1.0,  1.0
	];
	var vt = [
		0.0, 1.0,
		0.0, 0.0,
		1.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0
	];
	chart_quad_vp_vbo = gl.createBuffer ();
	chart_quad_vt_vbo = gl.createBuffer ();
  gl.bindBuffer (gl.ARRAY_BUFFER, chart_quad_vp_vbo);
	gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vp), gl.STATIC_DRAW);
	gl.bindBuffer (gl.ARRAY_BUFFER, chart_quad_vt_vbo);
	gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (vt), gl.STATIC_DRAW);
}

function init_chart () {
//	console.log ("creating line chart");
//	_create_line_shader_programme ();
//	_create_line_vbo ();
//
//	chart_fb_tex = gl.createTexture();
//	gl.bindTexture(gl.TEXTURE_2D, chart_fb_tex);
//
//	chart_fb = gl.createFramebuffer ();
//
//	// NB: can put "g_canvas" or an image in last param
//
//	gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA, g_chart_image_width, g_chart_image_height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
//	gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); 
//	gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//	gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
//	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
//	gl.bindFramebuffer (gl.FRAMEBUFFER, chart_fb);
//	gl.framebufferTexture2D (
//		gl.FRAMEBUFFER,
//		gl.COLOR_ATTACHMENT0,
//		gl.TEXTURE_2D,
//		chart_fb_tex,
//		0
//	);
//	gl.bindFramebuffer (gl.FRAMEBUFFER, null);

	/*var img = new Image ();
	img.src = "images/blank_chart.png";
	img.width = g_chart_image_width;
	img.height = g_chart_image_height;
	img.onload = function () {
		gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
		
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); 
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindFramebuffer (gl.FRAMEBUFFER, chart_fb);
		gl.framebufferTexture2D (
			gl.FRAMEBUFFER,
			gl.COLOR_ATTACHMENT0,
			gl.TEXTURE_2D,
			chart_fb_tex,
			0
		);
		gl.bindFramebuffer (gl.FRAMEBUFFER, null);
	}*/
	
	
	
//	_create_chart_quad ();
	chart_quad_sp = load_shaders_from_files (chart_quad_vs_filename, chart_quad_fs_filename);
	chart_quad_M_loc = get_uniform_loc (chart_quad_sp, "M");
	chart_quad_V_loc = get_uniform_loc (chart_quad_sp, "V");
	chart_quad_P_loc = get_uniform_loc (chart_quad_sp, "P");
	gl.useProgram (chart_quad_sp);
	var model = [
		1.0, 0.0, 0.0, 0.0,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	];
	gl.uniformMatrix4fv (chart_quad_M_loc, false, new Float32Array (model));
	//gl.uniformMatrix4fv (chart_quad_V_loc, false, new Float32Array (transpose_mat4 (gCam.mViewMat)));
	//gl.uniformMatrix4fv (chart_quad_P_loc, false, new Float32Array (transpose_mat4 (gCam.mProjMat)));
	load_font_shaders ();
	font_index = load_font ("fonts/freemono.png", "fonts/freemono.json");

//	title_text = create_text ("R02 Lights", font_index, 0.6, 0.005, 0.07, [0.2, 0.2, 0.2], true);
//	xaxis_text = create_text ("Hour", font_index, 0.45, 0.975, 0.035, [0.2, 0.2, 0.2], true);
//	xaxis_zero = create_text ("17 Oct", font_index, 0.05, 0.95, 0.035, [0.2, 0.2, 0.2], true);
//	xaxis_five = create_text ("22 Oct", font_index, 0.85, 0.95, 0.035, [0.2, 0.2, 0.2], true);
//	yaxis_text = create_text ("Energy (kWh)", font_index, 0.0, 0.02, 0.035, [0.2, 0.2, 0.2], true);
//	yaxis_zero = create_text ("0", font_index, 0.0, 0.875, 0.045, [0.2, 0.2, 0.2], true);
//	yaxis_five = create_text ("500", font_index, 0.0, 0.075, 0.045, [0.2, 0.2, 0.2], true);
//	label_green = create_text ("model", font_index, 0.86, 0.1, 0.045, [0.0, 1.0, 0.0], true);
//	label_blue = create_text ("meas.", font_index, 0.86, 0.15, 0.045, [0.0, 0.0, 1.0], true);
}

function _draw_line (
	xi, yi, xf, yf,
	x_axis_i, x_axis_f, y_axis_i, y_axis_f,
	width_px,
	rgba
) {

	xi = (xi - x_axis_i) / (x_axis_f - x_axis_i) * 2.0 - 1.0;
	xf = (xf - x_axis_i) / (x_axis_f - x_axis_i) * 2.0 - 1.0;
	yi = (yi - y_axis_i) / (y_axis_f - y_axis_i) * 2.0 - 1.0;
	yf = (yf - y_axis_i) / (y_axis_f - y_axis_i) * 2.0 - 1.0;
	xi *= overall_plot_scale_x;
	xf *= overall_plot_scale_x;
	yi *= overall_plot_scale_y;
	yf *= overall_plot_scale_y;

	// work of line length for y scale and width for x scale
	var dist_x = xf - xi;
	var dist_y = yf - yi;
	var length = Math.sqrt (dist_x * dist_x + dist_y * dist_y);
	var width = width_px / g_chart_image_width;
	var height = width;//height_px / g_canvas.height; // TODO was just width again?
	
	// get angle from i to f to work out rotation around z
	var rad = Math.atan2 (dist_x, dist_y);
	
	// xi, xf is the translation required
	gl.useProgram (line_sp);

	gl.enableVertexAttribArray (0);

	gl.uniform1f (line_sp_width_loc, width);
	gl.uniform1f (line_sp_length_loc, length);
	gl.uniform1f (line_sp_angle_loc, rad);
	gl.uniform4f (line_sp_colour_loc, rgba[0], rgba[1], rgba[2], rgba[3]);
	gl.uniform2f (line_sp_pos_loc, xi, yi);
	
	gl.disable (gl.DEPTH_TEST);
	gl.bindBuffer (gl.ARRAY_BUFFER, line_vbo);
	gl.vertexAttribPointer (0, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays (gl.TRIANGLES, 0, 6);

	gl.disableVertexAttribArray (0);
}

function _draw_grid (num_lines) {
	var grid_width_px = 5.0;
	var grid_rgba = [0.8, 0.8, 0.8, 1.0];
	var aspect = g_chart_image_width / g_chart_image_height;
	var grid_x_inc = 2.0 / num_lines;
	var grid_y_inc = 2.0 / num_lines;
	
	var curr_x = -1.0;
	for (var i = 0; i < 6; i++) {
		_draw_line (curr_x, -1.0, curr_x, 1.0, -1.0, 1.0, -1.0, 1.0, grid_width_px, grid_rgba);
		curr_x += grid_x_inc;
	}
	var curr_y = -1.0;
	for (var i = 0; i < 6; i++) {
		_draw_line (-1.0, curr_y, 1.0, curr_y, -1.0, 1.0, -1.0, 1.0, grid_width_px * aspect, grid_rgba);
		curr_y += grid_y_inc;
	}
}

function _draw_axes () {
	var axis_width_px = 8.0;
	var axis_rgba = [0.2, 0.2, 0.2, 1.0];
	var aspect = g_chart_image_width / g_chart_image_height;
	_draw_line (-1.0, -1.1, -1.0, 1.0, -1.0, 1.0, -1.0, 1.0, axis_width_px, axis_rgba);
	_draw_line (-1.1, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, axis_width_px * aspect, axis_rgba);
}

function _draw_tics (num_tics) {
	var tic_height = 0.05;
	var tic_width_px = 5.0;
	var tic_rgba = [0.4, 0.4, 0.4, 1.0];
	var aspect = g_chart_image_width / g_chart_image_height;
	var tic_x_inc = 2.0 / num_tics;
	var tic_y_inc = 2.0 / num_tics;
	var curr_x = -1.0 + tic_x_inc;
	for (var i = 0; i < num_tics; i++) {
		_draw_line (
			curr_x, -1.0 - tic_height * 0.5 * aspect,
			curr_x, -1.0 + tic_height * 0.5 * aspect,
			-1.0, 1.0,
			-1.0, 1.0,
			tic_width_px,
			tic_rgba
		);
		curr_x += tic_x_inc;
	}
	var curr_y = -1.0 + tic_y_inc;
	for (var i = 0; i < num_tics; i++) {
		_draw_line (
			-1.0 - tic_height * 0.5, curr_y,
			-1.0 + tic_height * 0.5, curr_y,
			-1.0, 1.0,
			-1.0, 1.0,
			tic_width_px * aspect,
			tic_rgba
		);
		curr_y += tic_y_inc;
	}
}

function _draw_plot (
	xy, xy_count,
	x_min, x_max,
	y_min, y_max,
	width_px,
	rgba
) {
	var i = 0;
	while (i < 2 * xy_count) {
		if (xy[i] < 0.0 || xy[i + 1] < 0.0 || xy[i + 2] < 0.0 || xy[i + 3] < 0.0) {
			// plot has invalid data
		} else {
			_draw_line (xy[i], xy[i + 1], xy[i + 2], xy[i + 3], x_min, x_max, y_min, y_max, width_px, rgba);
		}
		i += 2;
	}
}

function draw_chart_to_tex () {
    
        toggle_all_text_visibility ();
        
	gl.bindFramebuffer (gl.FRAMEBUFFER, chart_fb);
	gl.clearColor (1.0, 1.0, 1.0, 1.0);
	gl.clear (gl.COLOR_BUFFER_BIT);
	gl.viewport (0, 0, g_chart_image_width, g_chart_image_height);

	_draw_grid (4);
	_draw_axes ();
	_draw_plot (
		chart_plot_a, chart_plot_a.length / 2,
		chart_scale_xi, chart_scale_xf,
		chart_scale_yi, chart_scale_yf,
		plot_a_width,
		plot_a_rgba
	);

	//alert ("first: " + chart_plot_b[0] + "," + chart_plot_b[1] + " " + chart_plot_b[2] + "," + chart_plot_b[3]);
	_draw_plot (
		chart_plot_b, chart_plot_b.length / 2,
		chart_scale_xi, chart_scale_xf,
		chart_scale_yi, chart_scale_yf,
		plot_b_width,
		plot_b_rgba
	);

	_draw_tics (4);
	
	
	_draw_plot (
		[0.9, 0.9125, 0.95, 0.9125], 2,
		0.0, 1.0,
		0.0, 1.0,
		plot_a_width,
		plot_a_rgba
	);
	_draw_plot (
		[0.9, 0.975, 0.95, 0.975], 2,
		0.0, 1.0,
		0.0, 1.0,
		plot_b_width,
		plot_b_rgba
	);

	// hide all text
	hide_all_text ();
	// show individual text for plot
	set_text_visibility (title_text, true);
	set_text_visibility (xaxis_text, true);
	set_text_visibility (xaxis_zero, true);
	set_text_visibility (xaxis_five, true);
	set_text_visibility (yaxis_text, true);
	set_text_visibility (yaxis_zero, true);
	set_text_visibility (yaxis_five, true);
	set_text_visibility (label_green, true);
	set_text_visibility (label_blue, true);
        
	
//	render_text ();
	toggle_all_text_visibility ();
	
	/* write to HTML img as well */
	var data = new Uint8Array (g_chart_image_width * g_chart_image_height * 4);
	gl.readPixels(0, 0, g_chart_image_width, g_chart_image_height, gl.RGBA, gl.UNSIGNED_BYTE, data);
	var temp_canvas = document.createElement('canvas');
	temp_canvas.width = g_chart_image_width;
	temp_canvas.height = g_chart_image_height;
	var context = temp_canvas.getContext('2d');
	var imageData = context.createImageData (g_chart_image_width, g_chart_image_height);
	imageData.data.set(data);
	context.putImageData(imageData, 0, 0);
	var img = document.getElementById("overlay_img");
//	img.src = temp_canvas.toDataURL ();
	
	gl.bindFramebuffer (gl.FRAMEBUFFER, null);
}

//function draw_chart_tex_onto_quad () {
//	gl.viewport (0, 0, g_canvas.width, g_canvas.height);
//	//gl.disable (gl.DEPTH_TEST);
//
//	gl.activeTexture (gl.TEXTURE0);
//	gl.bindTexture(gl.TEXTURE_2D, chart_fb_tex);
//
//	gl.useProgram (chart_quad_sp);
//	gl.enableVertexAttribArray (0);
//	gl.enableVertexAttribArray (1);
//
//	gl.bindBuffer (gl.ARRAY_BUFFER, chart_quad_vp_vbo);
//	gl.vertexAttribPointer (0, 2, gl.FLOAT, false, 0, 0);
//	gl.bindBuffer (gl.ARRAY_BUFFER, chart_quad_vt_vbo);
//	gl.vertexAttribPointer (1, 2, gl.FLOAT, false, 0, 0);
//
//	gl.drawArrays (gl.TRIANGLES, 0, 6);
//
//	gl.disableVertexAttribArray (1);
//	gl.disableVertexAttribArray (0);
//}

function draw_chart_both_passes () {
	draw_chart_to_tex ();
	draw_chart_tex_onto_quad ();
}
