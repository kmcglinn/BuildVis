/**
 * @author Kris McGlinn
 *
 */
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

setInterval(function(){periodic_zone_sensor_query();}, 10000);
setInterval(function(){periodic_zone_state_query();}, 10000);
//setInterval(function(){alert('Test');}, 5000);

function periodic_zone_sensor_query()
{
    total_real_time_sensor_value=0;

//    get_sensor_value('17_9_GRFMET_2', 'Celsius', 'forum');

//    console.log(sensor_array.length);
    for(var i = 0; i<sensor_array.length; i++)
    {
        
//        console.log(sensorToString(sensor_array[i]));
//        console.log(current_activity_zone.id);
//        console.log(sensor_array[i].type);
        if((sensor_array[i].zone_id === current_activity_zone.id&&sensor_array[i].type==='Energy'))
        {

            get_sensor_value(sensor_array[i].id, sensor_array[i].type, buildings[current_building]);
            
        }

    }
    document.getElementById('energy_consumption_display_div_id').value=current_activity_zone.id;
    document.getElementById('energy_consumption_display_div').value=total_real_time_sensor_value+ ' kWh';
    
}

function periodic_zone_state_query()
{
      
//    current_activity_zone.id
    get_state_value(current_activity_zone.id, 1, 10, buildings[current_building]);
 
}

function get_average_sensor_value(sensor_id, mType, building_id)
{
    
    console.log('CALLING get_average_sensor_value FUNCTION');
    console.log('Querying SQL Database for sensor: ' + sensor_id + ' building id: '+ building_id);
    $.ajax({
    async: true,
    type: "POST",
    url: "php/getAvgSensorValue.php",
    dataType: 'Text',
//    data: {time:time, id:id, activity:activity, value:value}
    data: {id:sensor_id, building_id:building_id, mType:mType}
    }).done(function( result ) {
        console.log("$ajax.get succeeded. Value return: " + result);
        avg_sensor_value = avg_sensor_value + Number(result); 
        
        console.log("AJAX SETTING AVG SENSOR VALUE: " + avg_sensor_value);
        var display_value = Math.round(avg_sensor_value * 10000) / 10000;
        document.getElementById('avg_sensor_value_display_div').innerHTML='Total Avg. kWh= ' + display_value;
        if(avg_sensor_value>total_real_time_sensor_value)
        {
            console.log('Green');
            document.getElementById("traffic_light_red").style.opacity = "0.2";
            document.getElementById("traffic_light_orange").style.opacity = "0.2";
            document.getElementById("traffic_light_green").style.opacity = "1";

        }
        else if(avg_sensor_value===total_real_time_sensor_value)
        {
            console.log('Yellow');
            document.getElementById("traffic_light_red").style.opacity = "0.2";
            document.getElementById("traffic_light_orange").style.opacity = "1";
            document.getElementById("traffic_light_green").style.opacity = "0.2";
        }
        else
        {

            console.log('red');
            document.getElementById("traffic_light_green").style.opacity = "1";
            document.getElementById("traffic_light_orange").style.opacity = "0.2";
            document.getElementById("traffic_light_red").style.opacity = "0.2";

        }
        
    });

    

    
    console.log('Finished Querying SQL Database');
    
}

function get_sensor_value(sensor_id, mType, building_id){
    
    console.log('CALLING get_sensor_value FUNCTION');
    console.log('Querying SQL Database for sensor: ' + sensor_id + ' measurement_type: ' + mType + ' building id: '+ building_id);
    $.ajax({
    async: true,
    type: "POST",
    url: "php/getRealTimeSensorValue.php",
    dataType: 'Text',
//    data: {time:time, id:id, activity:activity, value:value}
    data: {id:sensor_id, building_id:building_id, mType:mType}
    }).done(function( result ) {
        console.log("$ajax.get succeeded. Value return: " + result);
        real_time_sensor_value = Number(result.replace(",", "."));  //This is hack as I do not know why a comma value is being returned by php and sql    
        console.log("AJAX SETTING SENSOR VALUE: " + real_time_sensor_value);
        total_real_time_sensor_value = total_real_time_sensor_value + real_time_sensor_value;
        console.log("AJAX SETTING TOTAL SENSOR VALUE: " + total_real_time_sensor_value);
        var display_value = Math.round(total_real_time_sensor_value * 10000) / 10000;
        document.getElementById('energy_consumption_display_div').value=display_value+ ' kWh';
//        }
        
    });

    console.log('Finished Querying SQL Database');
    
}

function get_state_value(zone_id, weight, efficiency_target, building_id){
    
    console.log('CALLING get_state_value FUNCTION');
    console.log('Querying SQL Database for zone: ' + zone_id + ' weight: ' + weight + ' efficiency_target : '+ efficiency_target);
    $.ajax({
    async: true,
    type: "POST",
    url: "php/getStateValue.php",
    dataType: 'Text',
//    data: {time:time, id:id, activity:activity, value:value}
    data: {id:zone_id, building_id:building_id, weight:weight, efficiency_target:efficiency_target}
    }).done(function( result ) {
        console.log("$ajax.get succeeded. Value return: " + result);
        var current_state_value = result;  
        console.log("AJAX CURRENT STATE VALUE: " + result);
        var suggested_state_value = result; 
        console.log("AJAX SUGGESTED STATE VALUE: " + suggested_state_value);
        document.getElementById('energy_actuation_suggested_value_div_id').innerHTML=suggested_state_value;
        
    });

    console.log('Finished Querying SQL Database');
    
   }