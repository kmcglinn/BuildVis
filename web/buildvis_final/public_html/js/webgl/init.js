//-----------------------------------

init_gl ();
init_chart ();

//if(current_building!==1){
//
//    var plot_a = new Array ();
//    var plot_b = new Array ();
//    var chart_x_max = 24;
//    for (var i = 0; i < chart_x_max * 2; i++) {
//            plot_a[i] = real_xy[i];
//            plot_b[i] = model_xy[i];
//    }
//    feed_plot_a (plot_a);
//    feed_plot_b (plot_b);
//    set_chart_scale (0.0, chart_x_max, 0.0, 200.0);
//    set_x_label ("Hours over period: " + real_date[0+1] + "-" + real_date[chart_x_max * 2 + 1]);
//    set_y_label ("Watts");
//    set_title ("Room 02 Lighting");
//}


var it = -48;
var g_last_time = (new Date).getTime ();
var g_rechart_step_time_accum = 1.0; // allow to update on first frame
var has_focus = true;
window.onfocus = function () {
	has_focus = true;
	console.log ("GL tab gained focus. resuming...");
	g_last_time = (new Date).getTime ();
}
window.onblur = function () {
	has_focus = false;
	console.log ("GL tab lost focus. pausing...");
}

if (!init ()) {
	console.error ("error initialising");
}

// -----------------------------------
if (!update ()) {
	console.error ("error updating scene");
}
