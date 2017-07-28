// variables used in update ()
var g_step_time_accum = 0.0;
var step_size = 0.02;
var currentlyPressedKeys = {};
var fps_counter = 0;
var fps_accum = 0;
var g_last_time;
var g_update_move = true;
var fb_tex = 0;
var colorTexture = 0;

var plot_a = new Array ();
var plot_b = new Array ();
var chart_x_max = 24;


function init () {
	gl.depthFunc (gl.LESS);
	gl.enable (gl.DEPTH_TEST);
	gl.cullFace (gl.BACK);
	gl.frontFace (gl.CCW);
	gl.enable (gl.CULL_FACE); // enable culling
	gl.blendFunc (gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	
	gl.clearColor (0.2, 0.2, 0.2, 1.0);
	
//	camera_pos = [-49.44, 35.60, 55.52];
	g_cam = new Camera (
		67.0, g_canvas.width / g_canvas.height, 0.1, 250.0, camera_pos, [0, -2, -1]
	);
        g_cam.change_heading (270, 1.0);
        if(current_building===2)
        {
            g_cam.change_attitude(40.0, 0.6);
        }
        if(current_building===3)
        {
            g_cam.change_attitude(40.0, 0.6);
//            g_cam.change_heading (180, 1.0);
        }
        if(current_building===4)
        {
            g_cam.change_attitude(40.0, 0.6);
//            g_cam.change_heading (180, 1.0);
        }
        if(current_building===7)
        {
            g_cam.change_attitude(40.0, 0.6);
            g_cam.change_heading (180, 1.0);
        }
        init_zones ();
	init_walls ();
	init_gui ();
	init_floor ();
        if(current_building===0)
        {
            init_blinds();
        }   
	
	init_input_handler ();

	return true;
}

function render () {

/////////////////////////////////////////////////////
// start of main rendering pass here - clear viewport etc.
/////////////////////////////////////////////////////

	gl.bindFramebuffer (gl.FRAMEBUFFER, null);
	gl.viewport (0, 0, g_canvas.width, g_canvas.height);
	// wipe canvas to background colour
	gl.clearColor (0.0, 0.0, 0.0, 1.0);
	gl.clear (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


       
	render_floor ();
//        console.log(camera_pos);
        
        
        if (can_draw_activity_zones)
        {
            draw_current_zone();
            draw_activity_zones();

            draw_path_zones();
            draw_current_path();
            draw_path();
//            if(current_building===1){
//                /*edit_kris_rob*/
//                set_zone_occupied_time_interval();
//                draw_occupied_zones();
//            }
            
        }
        render_walls ();
//        mirror_text();  
        render_text ();  
//        toggle_all_text_visibility ();
        
        if(current_building===0)
        {
//            render_blinds();
        }   
        

	//------------------------------------
//        if(current_building!==1)
//        {
//            gl.useProgram (chart_quad_sp);
//        }   
	
	
	var changle = -60.0;
	
	var model = identity_mat4 ();
	model = rotate_x_mat4_deg (model, changle);
	var dp = dot_vec3 ([0.0, 0.0, -1.0], normalise_vec3 ([g_cam.m_forward[0], 0.0, g_cam.m_forward[2]]));
	var angle = Math.acos (dp) * -57.2957795;
	if (g_cam.m_forward[0] < 0.0) {
		angle *= -1.0;
	}
	
//        model = rotate_y_mat4_deg (model, angle);
//	model = scale_mat4 (model, [1.5, 1.5, 1.5]);
//	model = translate_mat4 (model, [-47.65, 3.75, 3.0]);
//	
//	gl.uniformMatrix4fv (chart_quad_M_loc, false, new Float32Array (transpose_mat4 (model)));
//	gl.uniformMatrix4fv (chart_quad_V_loc, false, new Float32Array (transpose_mat4 (g_cam.mViewMat)));
//	gl.uniformMatrix4fv (chart_quad_P_loc, false, new Float32Array (transpose_mat4 (g_cam.mProjMat)));
//	draw_chart_tex_onto_quad ();
	
//	model = identity_mat4 ();
//	model = rotate_x_mat4_deg (model, changle);
//	model = rotate_y_mat4_deg (model, angle);
//	model = scale_mat4 (model, [1.5, 1.5, 1.5]);
//	model = translate_mat4 (model, [-55.84, 3.75, 4.72]);
//        
//	gl.uniformMatrix4fv (chart_quad_M_loc, false, new Float32Array (transpose_mat4 (model)));
//	gl.uniformMatrix4fv (chart_quad_V_loc, false, new Float32Array (transpose_mat4 (g_cam.mViewMat)));
//	gl.uniformMatrix4fv (chart_quad_P_loc, false, new Float32Array (transpose_mat4 (g_cam.mProjMat)));
//	draw_chart_tex_onto_quad ();
	
//	model = identity_mat4 ();
//	model = rotate_x_mat4_deg (model, changle);
//	model = rotate_y_mat4_deg (model, angle);
//	model = scale_mat4 (model, [1.5, 1.5, 1.5]);
//	model = translate_mat4 (model, [-55.84, 3.75, 8.72]);
////	model = scale_mat4 (model, [1,1,1]);
//	gl.uniformMatrix4fv (chart_quad_M_loc, false, new Float32Array (transpose_mat4 (model)));
//	gl.uniformMatrix4fv (chart_quad_V_loc, false, new Float32Array (transpose_mat4 (g_cam.mViewMat)));
//	gl.uniformMatrix4fv (chart_quad_P_loc, false, new Float32Array (transpose_mat4 (g_cam.mProjMat)));
//	draw_chart_tex_onto_quad ();
	//------------------------------------
	
	render_gui ();

	return true;
}

var temp_timer = 0;
function update () 
{
    if(web_gl_disable_keyboard)
    {
        can_select = true;
        
    }
    // timer
    var time = (new Date).getTime ();
    var elapsed = time - g_last_time;
    g_last_time = time;
    var seconds = elapsed / 1000.0;
    g_step_time_accum += seconds;

    // update fps printout
    fps_counter++;
    fps_accum += seconds;
    if (fps_counter > 9) {
            fps_counter = 0;
            var fps = 10.0 / fps_accum;
            fps_accum = 0.0;
//		document.getElementById('para_fps').innerHTML = fps.toFixed(2);
    }

    //update_chart_performace(seconds);

    temp_timer += elapsed;
    //gl.clearColor (Math.sin (temp_timer * 0.001) - 0.3, Math.cos (temp_timer * 0.001) - 0.3, Math.sin (temp_timer * 0.0001) - 0.3, 1.0);

    // update chart every 1s
    if (g_rechart_step_time_accum >= 1.0) {
            var date_name = "invalid";
            while (date_name == "invalid") {
                    it += 48;
                    // loop at the end
                    if (it + 48 >= (real_xy.length)) {
                            it = 0;
                    }
                    date_name = real_date[it + 1];
            }

            var ri = 0;
            for (var i = 0; i < 24; i++) {
                    plot_a[ri] = i;
                    plot_b[ri] = i;
                    ri++
                    plot_a[ri] = real_xy[it + i * 2 + 1];
                    plot_b[ri] = model_xy[it + i * 2 + 1];
                    ri++;
            }
            //alert (plot_b);
//                if(current_building!==1){
//                    feed_plot_a (plot_a);
//                    feed_plot_b (plot_b);
//                    set_chart_scale (0.0, chart_x_max, 0.0, 200.0);
//                    set_x_label ("Hours over day: " + date_name);
//                    g_rechart_step_time_accum = 0.0;
//                    draw_chart_to_tex ();
//                }

    }
    // put this here so it would do 1 chart per frame MAX
    // and not get hung up on slow processing
    g_rechart_step_time_accum += seconds;

    // compute time steps
    while (g_step_time_accum > step_size) {
            g_step_time_accum -= step_size;


            if (update_gui_clicks (step_size)) {
                    g_update_move = true;
            } else {
                    // gui not clicked on so check for ray-plane paint
            }
            if (handle_keyboard_input (step_size)) {
                    g_update_move = true;
            }

            if (g_update_move) {
                    // update view and projection matrices in each shader programme
                    update_wall_cam_mats ();			
                    update_floor_cam_mats ();
                    if(current_building===0){
                        update_blinds_cam_mats ();
                    }
                    // update html with cam pos
//			document.getElementById ('para_cam_pos').innerHTML =
//				"campos = " + g_cam.mWC_Pos[0].toFixed(2) + ", "
//				+ g_cam.mWC_Pos[1].toFixed(2) + ", " + g_cam.mWC_Pos[2].toFixed(2);
                    g_update_move = false;
            }
    }

    // render once and request re-draw of canvas
    if (!render ()) {
            console.error ("error rendering scene");
            return false;
    }
    window.requestAnimFrame(update, g_canvas);
    return true;
}
