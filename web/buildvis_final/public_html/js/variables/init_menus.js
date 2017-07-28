/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//var seriesOptions = [];
//seriesOptions[i] = {
//            name: name,
//            data: data
//    };
//function init_highcart_values()
//{
//    
//}


function init_sensors()
{

    query_sensors();
    set_sensor_checkbox();
    
//    display_sensor_types();
}

function update_sensor_checkbox()
{
    
    resetCheckbox();
    update_sensor_set();
    set_sensor_checkbox();
  
}



function update_sensor_set()
{
    sensor_types = new MiniSet();
    avg_sensor_value = 0; //reset the avg sensor value for this zone (currently only energy)

    for(var j = 0; j < sensor_array.length; j++)
    {
        if(sensor_array[j].zone_id===current_activity_zone.id)   
        {
            console.log('For zone: ' + sensor_array[j].zone_id + ' found sensor type: ' + sensor_array[j].type);
            sensor_types.add(sensor_array[j].type);
            if(document.getElementById("drop_down_sensors_type_id") !== null){

                console.log(document.getElementById("drop_down_sensors_type_id").options[i].value);
                console.log(i);
                document.getElementById("drop_down_sensors_type_id").options[i].text = sensor_types[i];
            }
            if(sensor_array[j].type==='Energy')
            {
                
                get_average_sensor_value(sensor_array[j].id, 'kWh', buildings[current_building]); //partial fix
                console.log('Updating average sensor value');

            }
            
        }
        
    }
    
    if(!sensor_types.has('Energy'))
    {

        document.getElementById('avg_sensor_value_display_div').innerHTML='Total Avg. kWh= ' + 0;
        console.log('Yellow');
        document.getElementById("traffic_light_red").style.opacity = "0.2";
        document.getElementById("traffic_light_orange").style.opacity = "1";
        document.getElementById("traffic_light_green").style.opacity = "0.2";

    }
    
}   
function set_sensor_checkbox()
{
    s_array = sensor_types.keys();
//    if(s_array.length===0)
//    {
//        document.getElementById("sensors_for_query_label_id").value = 'No Sensors in Zone';
//    }
    for(var i = 0; i<s_array.length; i++)
    {

            if(document.getElementById("drop_down_sensors_type_id") !== null){

                console.log(document.getElementById("drop_down_sensors_type_id").options[i].value);
                console.log(i);
                document.getElementById("drop_down_sensors_type_id").options[i].text = sensor_types[i];
            }
            addCheckbox(s_array[i]);

    }

    
}
function resetCheckbox() {

    $("#monitoring_checklist_div").empty();

}
function addCheckbox(name) {
   var container = $('#monitoring_checklist_div');
   var inputs = container.find('input');
   var id = inputs.length+1;
   
//   alert('m_c_'+id);
   $('<input />', { type: 'checkbox', id: 'm_c_'+id, value: name }).appendTo(container);
   $('<label />', { 'for': 'm_c_'+id, text: name }).appendTo(container);
   $('<br />').appendTo(container);
//   $('<input />', { 'for': 'm_c_'+id, value: real_time_sensor_value  }).appendTo(container);
//   $('<br />').appendTo(container);
}


function drop_down_sensors_type(){
    
    document.write("<select name=\"activity_type_dropdown\" id=\"drop_down_sensors_type_id\" class=\"OptionsStyle\" onchange=\"choose_sensor_type()\">"+
                        "<option value=\"1\" id=\"drop_down_sensors_type_id_1\">No sensor types found!</option>"+
                        "<option value=\"2\" id=\"drop_down_sensors_type_id_2\"></option>"+
                        "<option value=\"3\" id=\"drop_down_sensors_type_id_3\"></option>"+
                        "<option value=\"4\" id=\"drop_down_sensors_type_id_4\"></option>"+
                        "<option value=\"5\" id=\"drop_down_sensors_type_id_5\"></option>"+
                "</select>");
        
}



function choose_sensor_type()
{
    
//    var mylist=document.getElementById("drop_down_sensors_type_id");
    var mylist = document.getElementById('drop_down_sensors_type_id').options[document.getElementById('drop_down_sensors_type_id').selectedIndex].value;
//    document.getElementById("drop_down_sensors_type_id").options[i].text
//    alert(mylist);
    if(mylist==="1"){
        
        document.getElementById("EnergyMeter_drop_down_id").style.display = "block";
        document.getElementById("BrightnessSensor_drop_down_id").style.display = "none";
    }
    if(mylist==="2"){
        document.getElementById("EnergyMeter_drop_down_id").style.display = "none";
        document.getElementById("BrightnessSensor_drop_down_id").style.display = "block";
    }
}

function choose_sensor_id()
{
    var sid
    var mylist=document.getElementById("drop_down_sensors_type_id").value;
//    alert(mylist);
    if(mylist==="1"){
        sid = document.getElementById("EnergyMeter_drop_down_id").options[document.getElementById('EnergyMeter_drop_down_id').selectedIndex].text;
    }
    if(mylist==="2"){
        sid = document.getElementById("BrightnessSensor_drop_down_id").options[document.getElementById('BrightnessSensor_drop_down_id').selectedIndex].text;  
    }
//    alert(sid);
    return sid;
}

//function display_sensor_types(){
//    
//    document.write("<select name=\"activity_type_dropdown\" id=\"drop_down_sensors_mediatic_energy_id\" class=\"OptionsStyle\">"+
//                        "<option value=\"1\" id=\"1\">EM1$hasAnalogValue$kWh</option>"+
//                "</select>");
//        
//}
function drop_down_sensors_mediatic_energy(){
    
    document.write("<select name=\"activity_type_dropdown\" id=\"EnergyMeter_drop_down_id\" class=\"OptionsStyle\">"+
                        "<option value=\"1\" id=\"1\">EM1$hasAnalogValue$kWh</option>"+
                "</select>");
        
}
function drop_down_sensors_mediatic_lux(){
    
    document.write("<select name=\"activity_type_dropdown\" id=\"BrightnessSensor_drop_down_id\" class=\"OptionsStyle\">"+
//                        "<option value=\"1\" id=\"1\">LHT_DIG1_bri$hasAnalogValue$lux</option>"+
//                        "<option value=\"2\" id=\"2\">LHT_DIG2_bri$hasAnalogValue$lux</option>"+
//                        "<option value=\"3\" id=\"3\">LHT_DIG3_bri$hasAnalogValue$lux</option>"+
//                        "<option value=\"4\" id=\"4\">LHT_DIG4_bri$hasAnalogValue$lux</option>"+
//                        "<option value=\"5\" id=\"5\">LHT_DIG5_bri$hasAnalogValue$lux</option>"+
                        "<option value=\"1\" id=\"1\">LHT_DIG1_bri$hasAnalogValue$lux</option>"+
                        "<option value=\"2\" id=\"2\">LHT_DIG2_bri$hasAnalogValue$lux</option>"+
                        "<option value=\"3\" id=\"3\">LHT_DIG3_bri$hasAnalogValue$lux</option>"+
                        "<option value=\"4\" id=\"4\">LHT_DIG4_bri$hasAnalogValue$lux</option>"+
                        "<option value=\"5\" id=\"5\">LHT_DIG5_bri$hasAnalogValue$lux</option>"+
                        "<option value=\"6\" id=\"1\">LHT_DIG1_bri$hasAnalogValue$lux</option>"+
                        "<option value=\"7\" id=\"2\">LHT_DIG2_bri$hasAnalogValue$lux</option>"+
                        "<option value=\"8\" id=\"3\">LHT_DIG3_bri$hasAnalogValue$lux</option>"+
                        "<option value=\"9\" id=\"4\">LHT_DIG4_bri$hasAnalogValue$lux</option>"+
                        "<option value=\"10\" id=\"5\">LHT_DIG5_bri$hasAnalogValue$lux</option>"+                       
                        "<option value=\"11\" id=\"4\">LHT_DIG4_bri$hasAnalogValue$lux</option>"+
                        "<option value=\"12\" id=\"5\">LHT_DIG5_bri$hasAnalogValue$lux</option>"+
                "</select>");
        
}
function drop_down_sensors_mediatic_temp(){
    
    document.write("<select name=\"activity_type_dropdown\" id=\"TemperatureSensor_drop_down_id\" class=\"OptionsStyle\">"+
                        "<option value=\"1\" id=\"1\"></option>"+
                        "<option value=\"2\" id=\"2\"></option>"+
                        "<option value=\"3\" id=\"3\"></option>"+
                        "<option value=\"4\" id=\"4\"></option>"+
                        "<option value=\"5\" id=\"5\"></option>"+
                "</select>");
        
}
function drop_down_sensors_mediatic_humidity(){
    
    document.write("<select name=\"activity_type_dropdown\" id=\"HumiditySensor_drop_down_id\" class=\"OptionsStyle\">"+
                        "<option value=\"1\" id=\"1\"></option>"+
                        "<option value=\"2\" id=\"2\"></option>"+
                        "<option value=\"3\" id=\"3\"></option>"+
                        "<option value=\"4\" id=\"4\"></option>"+
                        "<option value=\"5\" id=\"5\"></option>"+
                "</select>");
        
}
    
