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
//var gl_canvas_width = 450;
//var gl_canvas_height = 600;
var activity_day = new Array();
var current_activity_type; //Store the surrent activity type

var overlay_visible = false;

function set_html_visibility() 
{
    if (!energy_monitoring_visible) 
    {
        document.getElementById('panel_energy_monitoring_panel').style.display = "none";
    } 
    if (!logging_interface_visible) 
    {
        document.getElementById('logging_interface_panel').style.display = "none";
    }
    if (!web_gl_visible) 
    {
        document.getElementById('webg_gl_view_panel').style.display = "none";
    }
    if (!activity_modeller_visible) 
    {
        document.getElementById('activity_modeller_panel').style.display = "none";
    }
	
}

function toggle_canvas_overlay () {
	if (overlay_visible) {
		document.getElementById('canvas_overlay').style.visibility = 'hidden';
		document.getElementById('show_fm_overlay').style.visibility = 'visible';
	} else {
		document.getElementById('canvas_overlay').style.visibility = 'visible';
		document.getElementById('show_fm_overlay').style.visibility = 'hidden';
	}
	overlay_visible = !overlay_visible;
}


$(function() {
  $("#datepicker").datepicker({
      beforeShowDay: function(date) {
          var day = date.getDay();
          return [(day != 2 && day != 3 && day != 4 && day != 5 && day != 6 && day != 0), ''];
      }
  });
});

for(var i = 0; i<7; i++){
    activity_day.push(false);
}

$(function() 
{
  
//  console.log('Working!');
  $( "#rule_tabs" ).tabs();
//  console.log('Still Working!');
  
});


$(function() 
{
  
//  console.log('Working!');
  $( "#activity_tabs" ).tabs();
//  console.log('Still Working!');
  
});

$(function() {
  $( "#tabs_energy_monitoring" ).tabs();
});
  

function choose_activity_dropdown()
{
    current_activity_type = "Activity";
    /*These have been commented out due to the
     * Replace along with HTML code
     */
    //var mylist=document.getElementById("zone_type_dropdown_id");
    //current_activity_type = mylist.options[mylist.selectedIndex].text;
     /*These have been commented out due to the
     * Replace along with HTML code
     */   

    
}
function toggleVisibility(divid) 
{
    
    console.log('Toggle Visibility of Divs');
    
    if (divid==="activity-console"){
        document.getElementById("activity-console").style.visibility = "visible";
        document.getElementById("energyvis-console").style.visibility = "hidden";
        console.log('Set to activity day start and end');

    }
    else if (divid==="energyvis-console")
    {
        document.getElementById("energyvis-console").style.visibility = "visible";
        document.getElementById("activity-console").style.visibility = "hidden";

    }
    else if (divid==="activity-day-start-end-table")
    {
        
        document.getElementById("activity-day-start-end-table").style.display = "block";
        document.getElementById("activity-lunch-table").style.display = "none";
        document.getElementById("activity-meetings-table").style.display = "none";
        console.log('Set to activity day start and end');
        current_activity_tab = 0;
    }
    else if (divid==="activity-lunch-table")
    {
        document.getElementById("activity-day-start-end-table").style.display = "none";
        document.getElementById("activity-lunch-table").style.display = "block";
        document.getElementById("activity-meetings-table").style.display = "none";
        console.log('Set to activity lunch start and end');
        current_activity_tab = 1;
//        alert("Functioning");
    }
//    else if (divid==="activity-breaks-table")
//    {
//        document.getElementById("activity-day-start-end-table").style.display = "none";
//        document.getElementById("activity-lunch-table").style.display = "none";
//        document.getElementById("activity-breaks-table").style.display = "block";
//        current_activity_tab = 2;
//    }
    else if (divid==="activity-meetings-table")
    {
        console.log('Set to activity meeting start and end');
        document.getElementById("activity-day-start-end-table").style.display = "none";
        document.getElementById("activity-lunch-table").style.display = "none";
        document.getElementById("activity-meetings-table").style.display = "block";
        current_activity_tab = 3;

    }
    else if (divid==="canvas_id")
    {
        document.getElementById("canvas_id").style.display = "block";

        document.getElementById("forum_image").style.display = "none";
        if(fm_view===true)
        {
            document.getElementById("zone_viewer_div").style.display = "block";
//        document.getElementById("webg-size-radio").style.display = "block";
            document.getElementById("path_viewer_div").style.display = "block";
        }
    if(can_view_path_id===true)
        {
            document.getElementById("path_viewer_div").style.display = "block";
        }
    }
    else if (divid==="forum_image")
    {
        document.getElementById("canvas_id").style.display = "none";
        document.getElementById("zone_viewer_div").style.display = "none";
        document.getElementById("path_viewer_div").style.display = "none";
    }
}

function toggleSize(size){
    var glcanvas;
    if(size===1){
        glcanvas=document.getElementById('canvas_id');
        glcanvas.style.height = '450px';
        glcanvas.style.width = '600px';
    }
    else if(size===2){
        glcanvas=document.getElementById('canvas_id');
        glcanvas.style.height = '600px';
        glcanvas.style.width = '800px';
    }
    
}

function toggle_visible_overlay () 
{
	if (overlay_visible) {
		document.getElementById('canvas_overlay').style.visibility = 'hidden';
		document.getElementById('show_fm_overlay').style.visibility = 'visible';
	} else {
		document.getElementById('canvas_overlay').style.visibility = 'visible';
		document.getElementById('show_fm_overlay').style.visibility = 'hidden';
	}
	overlay_visible = !overlay_visible;
}

function toggle_am_visible_overlay () 
{
	if (overlay_visible) {
		document.getElementById('am_canvas_overlay').style.visibility = 'hidden';
		document.getElementById('am_overlay').style.visibility = 'visible';
	} else {
		document.getElementById('canvas_overlay').style.visibility = 'visible';
		document.getElementById('am_overlay').style.visibility = 'hidden';
	}
	overlay_visible = !overlay_visible;
}

function set_zone_form_values(){
    
    document.forms["zone_form"]["zone_id_name"].value = current_activity_zone.id;
//    document.forms["zone_form"]["zone_id_name"].value = current_activity_zone.id;
//    document.getElementById['energy_consumption_display_div_id'].value = current_activity_zone.symbolic;
//    console.log(current_activity_zone.symbolic);
//    document.forms["zone_form_2"]["zone_id_name_2"].value = current_activity_zone.symbolic;
    
//    /
//    
//    toggle_visible_overlay();
//    document.forms["zone_form"]["zone_x1"].value = current_activity_zone.p1X;
//    document.forms["zone_form"]["zone_y1"].value = current_activity_zone.p1Y;
//    document.forms["zone_form"]["zone_z1"].value = current_activity_zone.p1Z;
//    
//    document.forms["zone_form"]["zone_x2"].value = current_activity_zone.p2X;
//    document.forms["zone_form"]["zone_y2"].value = current_activity_zone.p2Y;
//    document.forms["zone_form"]["zone_z2"].value = current_activity_zone.p2Z;
    if(can_view_path_id===true)
    {
        document.forms["path_form"]["path_id_name"].value = current_path_node_array[0].path_id;
    }
    
    document.forms["path_form"]["path_entrance_id_form"].value = path_entry_id; //current_path_node_array[0].activity_path_id; //?
    document.forms["path_form"]["path_exit_id_form"].value = path_exit_id;  //current_path_node_array[length-1].activity_path_id;//
    
}

function set_entrance(){
//    alert(entrance_set);
    if(entrance_set === false)
    {
        entrance_set = true;
    }
    else entrance_set = false;
//    alert(entrance_set);
}

function set_exit(){
    
    if(exit_set === false)
    {
        exit_set = true;
    }
    else exit_set = false;
}

function update_zone_id_handsontables(){
    
    zone_id_handsontable = "Ooooh!";
//    alert(zone_id_handsontable);
    
}
function check_activity_path_entrance_exit()
{   
    document.write("\n\
            <div id=\"e_a_text_div\">\n\
                <div id=\"entrance_path_zone_id\">Path Entrance Zone:</div>\n\
                <div id=\"exit_path_zone_id\">Path Exit Zone:</div>\n\
            </div>\n\
            <div id=\"e_a_form_checks_div\">\n\
                <form name=\"path_form\">\n\
                    <input type=\"text\" id=\"path_entrance_id_form\"><input id = \"activity_ea_checkbox_id_1\" type=\"checkbox\" class=\"adri\" onclick=\"set_entrance();\">\n\
                    <input type=\"text\" id=\"path_exit_id_form\"><input id = \"activity_ea_checkbox_id_2\" type=\"checkbox\" class=\"adri\" onclick=\"set_exit();\">\n\
                </form>\n\
            </div>");
}
function radio_activity_day()
{
    
    document.write("\
            <div id=\"radio_activity_day_left\">\n\
            <input id = \"activity_day_radio_id_1\" type=\"checkbox\" class=\"adri\" onclick=\"set_activity_day(1);\">"+monday_text+"</br>"+
            "<input id = \"activity_day_radio_id_3\" type=\"checkbox\" class=\"adri\" onclick=\"set_activity_day(3);\">"+wednesday_text+"</br>"+
            "<input id = \"activity_day_radio_id_5\" type=\"checkbox\" class=\"adri\" onclick=\"set_activity_day(5);\">"+friday_text+"</br>"+
            "<input id = \"activity_day_radio_id_7\" type=\"checkbox\" class=\"adri\" onclick=\"set_activity_day(7);\">"+sunday_text+""+
            "</div>\n\
            <div id=\"radio_activity_day_right\">"+
            "<input id = \"activity_day_radio_id_2\" type=\"checkbox\" class=\"adri\" onclick=\"set_activity_day(2);\">"+tuesday_text+"</br>"+
            "<input id = \"activity_day_radio_id_4\" type=\"checkbox\" class=\"adri\" onclick=\"set_activity_day(4);\">"+thursday_text+"</br>"+
            "<input id = \"activity_day_radio_id_6\" type=\"checkbox\" class=\"adri\" onclick=\"set_activity_day(6);\">"+saturday_text+"</div>");
}

function set_activity_day(day){
//    //alert(day);
//    if(day===1)
//    {
        if(activity_day[day-1]===false)
        {
            activity_day[day-1] = true;
//            alert(day);
        }
        else
            activity_day[day-1] = false;
//    }
//    alert(activity_day[day-1]);
}
function drop_down_activities(){
    
    document.write("<select name=\"activity_type_dropdown\" id=\"activity_type_dropdown_id\" class=\"OptionsStyle\">"+
                        "<option value=\"1\" id=\"1\">Work Place</option>"+
                        "<option value=\"2\" id=\"2\">Lunch Break</option>"+
                        "<option value=\"3\" id=\"3\">Smoke</option>"+
                        "<option value=\"4\" id=\"4\">Toilet</option>"+
                        "<option value=\"5\" id=\"5\">Drink</option>"+
                "</select>");
        
}

function dynamic_drop_down_zones(){
    
      
    document.write("<select name=\"activity_type_dropdown\" id=\"dynamin_drop_down_zones_id\" class=\"OptionsStyle\">");
    for(var i=0; i <zone_activity_array.length; i++)
    {
        document.write("<option value=\""+i+"\" id=\""+i+"\">"+zone_activity_array[i].symbolic+"/option>");
    }
    document.write("</select>");
        
}


//function set_number_of_days()
//{  
//    var month = parseInt(document.getElementById("month").value);
//    var year = parseInt(document.getElementById("year").value);
//    
//    number_of_days = calculate_day_of_month(month, year);
//    
//}
//
//function drop_down_dates(){
//
//    document.write("<select id=\"month\" name=\"month\" onclick=\"set_number_of_days()\">"+
//                            "<option value=\"01\">January</option>"+
//                            "<option value=\"02\">February</option>"+
//                            "<option value=\"03\">March</option>"+
//                            "<option value=\"04\">April</option>"+
//                            "<option value=\"05\">May</option>"+
//                            "<option value=\"06\">June</option>"+
//                            "<option value=\"07\">July</option>"+
//                            "<option value=\"08\">August</option>"+
//                            "<option value=\"09\">September</option>"+
//                            "<option value=\"10\">October</option>"+
//                            "<option value=\"11\">November</option>"+
//                            "<option value=\"12\">December</option>"+
//                    "</select>");
//    
////    if(document.getElementById("month").value === "01")
////    {
////        alert("Test");
////    }
//
//    document.write("<select id=\"day\" name=\"day\">");
//
//    for(var i = 1; i<number_of_days+1; i++)
//    {
//        
//        document.write("<option value=\""+i+"\">"+i+"</option>");
//        
//    }
//    
//    document.write("</select>"+
//    "<select id=\"year\" name=\"year\" onclick=\"set_number_of_days()\">"+
//            "<option value=\"2012\">2012</option>"+
//            "<option value=\"2013\">2013</option>"+
//    "</select>"+
//    "<input type=\"hidden\" id=\"datepicker\" />");
//
//}

//function drop_down_meeting_table(){
//    
//        document.write("<select name=\"dayOptions\" id=\"dayOptionsId\" class=\"OptionsStyle\">"+
//                            "<option value=\"0\" id=\"1\">Monday</option>"+
//                            "<option value=\"1\" id=\"2\">Tuesday</option>"+
//                            "<option value=\"2\" id=\"3\">Wednesday</option>"+
//                            "<option value=\"3\" id=\"4\">Thursday</option>"+
//                            "<option value=\"4\" id=\"5\">Friday</option>"+
//                            "<option value=\"5\" id=\"6\">Saturday</option>"+
//                            "<option value=\"6\" id=\"7\">Sunday</option>"+
//                    "</select>");
//    
//}
function drop_down_break_table(){
    
    document.write("<select name=\"dayOptions\" id=\"dayOptionsId\" class=\"OptionsStyle\">"+
                            "<option value=\"0\" id=\"1\">"+monday_text+"</option>"+
                            "<option value=\"1\" id=\"2\">"+tuesday_text+"</option>"+
                            "<option value=\"2\" id=\"3\">"+wednesday_text+"</option>"+
                            "<option value=\"3\" id=\"4\">"+thursday_text+"</option>"+
                            "<option value=\"4\" id=\"5\">"+friday_text+"</option>"+
                            "<option value=\"5\" id=\"6\">"+saturday_text+"</option>"+
                            "<option value=\"6\" id=\"7\">"+sunday_text+"</option>"+
                    "</select>");
    
    
}
function drop_down_meetings_table(){
    
    document.write("<select name=\"dayMeetingOptions\" id=\"dayMeetingOptionsId\" class=\"OptionsStyle\">"+
                            "<option value=\"0\" id=\"1\">"+monday_text+"</option>"+
                            "<option value=\"1\" id=\"2\">"+tuesday_text+"</option>"+
                            "<option value=\"2\" id=\"3\">"+wednesday_text+"</option>"+
                            "<option value=\"3\" id=\"4\">"+thursday_text+"</option>"+
                            "<option value=\"4\" id=\"5\">"+friday_text+"</option>"+
                            "<option value=\"5\" id=\"6\">"+saturday_text+"</option>"+
                            "<option value=\"6\" id=\"7\">"+sunday_text+"</option>"+
                    "</select>");
    
    
}
//function drop_down_break_table(){
//    
//    document.write("<select name=\"dayOptions\" id=\"dayOptionsId\" class=\"OptionsStyle\">"+
//                            "<option value=\"0\" id=\"1\">Maandag</option>"+
//                            "<option value=\"1\" id=\"2\">Dinsdag</option>"+
//                            "<option value=\"2\" id=\"3\">Woensdag</option>"+
//                            "<option value=\"3\" id=\"4\">Donderdag</option>"+
//                            "<option value=\"4\" id=\"5\">Vrijdag</option>"+
//                            "<option value=\"5\" id=\"6\">Zatertag</option>"+
//                            "<option value=\"6\" id=\"7\">Zondag</option>"+
//                    "</select>");
//    
//    
//}
$(document).ready(function () {
        $("#dayOptionsId").change(function () {
                 $("#dayOptionsId option:selected").each(function ()
                {
                        if($(this).attr("id") == "1")
                        {
                                $("#dailyBreaksMon").show();
                                //$("#dayOfTheWeek").update("Monday");
                        }
                        else
                        {
                                $("#dailyBreaksMon").hide();
                        }
                        if($(this).attr("id") == "2")
                        {
                                $("#dailyBreaksTues").show();
                                //$("#dayOfTheWeek").update("Tuesday");
                        }
                        else
                        {
                                $("#dailyBreaksTues").hide();
                        }
                        if($(this).attr("id") == "3")
                        {
                                $("#dailyBreaksWed").show();
                        }
                        else
                        {
                                $("#dailyBreaksWed").hide();
                        }
                        if($(this).attr("id") == "4")
                        {
                                $("#dailyBreaksThurs").show();
                        }
                        else
                        {
                                $("#dailyBreaksThurs").hide();
                        }
                        if($(this).attr("id") == "5")
                        {
                                $("#dailyBreaksFri").show();
                        }
                        else
                        {
                                $("#dailyBreaksFri").hide();
                        }
                        if($(this).attr("id") == "6")
                        {
                                $("#dailyBreaksSat").show();
                        }
                        else
                        {
                                $("#dailyBreaksSat").hide();
                        }
                        if($(this).attr("id") == "7")
                        {
                                $("#dailyBreaksSun").show();
                        }
                        else
                        {
                                $("#dailyBreaksSun").hide();
                        }
                });
        }).change();
});
$(document).ready(function () {
        $("#dayMeetingOptionsId").change(function () {
                 $("#dayMeetingOptionsId option:selected").each(function ()
                {
                        if($(this).attr("id") == "1")
                        {
                                $("#dailyMeetingsMon").show();
                                //$("#dayOfTheWeek").update("Monday");
                        }
                        else
                        {
                                $("#dailyMeetingsMon").hide();
                        }
                        if($(this).attr("id") == "2")
                        {
                                $("#dailyMeetingsTue").show();
                                //$("#dayOfTheWeek").update("Tuesday");
                        }
                        else
                        {
                                $("#dailyMeetingsTue").hide();
                        }
                        if($(this).attr("id") == "3")
                        {
                                $("#dailyMeetingsWed").show();
                        }
                        else
                        {
                                $("#dailyMeetingsWed").hide();
                        }
                        if($(this).attr("id") == "4")
                        {
                                $("#dailyMeetingsThur").show();
                        }
                        else
                        {
                                $("#dailyMeetingsThur").hide();
                        }
                        if($(this).attr("id") == "5")
                        {
                                $("#dailyMeetingsFri").show();
                        }
                        else
                        {
                                $("#dailyMeetingsFri").hide();
                        }
                        if($(this).attr("id") == "6")
                        {
                                $("#dailyMeetingsSat").show();
                        }
                        else
                        {
                                $("#dailyMeetingsSat").hide();
                        }
                        if($(this).attr("id") == "7")
                        {
                                $("#dailyMeetingsSun").show();
                        }
                        else
                        {
                                $("#dailyMeetingsSun").hide();
                        }
                });
        }).change();
});

function convert_number_to_day(num)
{
   
    if(num===0){
        
        return "Mon";
    }
    else if(num===1){
        
        return "Tue";
    }
    else if(num===2){
        
        return "Wed";
    }
    else if(num===3){
        
        return "Thur";
    }
    else if(num===4){
        
        return "Fri";
    }
    else if(num===5){
        
        return "Sat";
    }
    else if(num===6){
        
        return "Sun";
    }
}





function convert_string_array_to_number_array(array)
{
    
    for(var i = 0; i<array.length; i++)
    {
        array[i] = parseFloat(array[i]);
    }
    
    return array;
}


    
function create_highchart_performance(input_series1, input_series2, date){
    
//        input_series = input_series.slice(6, input_series.length-5);
        date = "Hours over day: " + date;
//        seriesOptions[0] = {
//            name: 'Occupancy',
//            data: input_series
//        };

//        console.log(date);
//        var input_series = input_series1.slice(0, input_series/2);
//        console.log("Input series 1: " + input_series1);
//        console.log("Input series 2: " + input_series2);
//        alert(seriesOptions);
        for(var i = 0; i<seriesOptions.length; i++)
        {
//            alert(seriesOptions[i].data.toString());
        }    
        chart = new Highcharts.Chart({
            chart: {
                    renderTo: 'chartViz2',
                    type: 'line',
                    marginRight: 130,
                    marginBottom: 40
            },
            title: {
                    text: '',
                    x: -20 //center
            },
            subtitle: 
                    {
                    text: 'Zone: ' +current_activity_zone.symbolic + ' Energy Consumption 0.56 kWh',
                    x: -20,
                    style: 
                    {

                        font: 'normal 14px Verdana, sans-serif',

                        color : '#000099'

                    }
            },
            xAxis: {
                    title: {
                            text: date
                    },
                    categories: [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
            },
            yAxis: {
                    title: {
                            text: "Watts per hour"
                    },
                    plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                    }]
            },
            tooltip: {
                    formatter: function() {
                                    return '<b>'+ this.series.name +'</b><br/>'+
                                    this.x +': '+ this.y +'kWh';
                    }
            },
            legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -10,
                    y: 100,
                    borderWidth: 0
            },
            series: [{
                    name: 'Model',
                    data: input_series1
            },
            {
                    name: 'Measured',
                    data: input_series2
            }]
        });     
}

var p_count = 40;
var plot_1 = new Array(24);
var plot_2 = new Array(24);

function update_chart_performace(){
//    console.log(p_count);
    
    if (p_count < 50) 
    {
        

//        alert (plot_b);
        
//        if(current_building!==1){
//            feed_plot_a (plot_a);
//            feed_plot_b (plot_b);
//            set_chart_scale (0.0, chart_x_max, 0.0, 200.0);
//            set_x_label ("Hours over day: " + date_name);
//            g_rechart_step_time_accum = 0.0;
//            draw_chart_to_tex ();
//        }
        p_count++;
    }
    else
    {
        var date_name = "invalid";
        while (date_name === "invalid") {
                it += 48;
                // loop at the end
                if (it + 48 >= (real_xy.length)) {
                        it = 0;
                }
                date_name = real_date[it + 1];
        }
        var sum = 0;
//        var ri = 0;
        for (var i = 0; i < 24; i++) {
            plot_1[i] = real_xy[it + i * 2 + 1];
            sum = Number(real_xy[it + i * 2 + 1])+sum;
            plot_2[i] = model_xy[it + i * 2 + 1];

        }
//        console.log(sum);
        if(sum>0)
        {
            create_highchart_performance(plot_1, plot_2, date_name);
            p_count = 0;
        }
        else 
        {
            p_count = 29;
        }
        
    }
    // put this here so it would do 1 chart per frame MAX
    // and not get hung up on slow processing
//    g_rechart_step_time_accum += secs;
        
}

