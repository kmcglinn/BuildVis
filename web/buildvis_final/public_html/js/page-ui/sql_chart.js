/**
 * @author Kris McGlinn
 *
 */
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var activity_day = new Array();
var time_series;// = new Array();
var input_series;// = new Array();
var occupancy_series = new Array();
var energy_value_series;// = new Array();
var temperature_value_series = new Array();
var humidity_value_series = new Array();
var co2_value_series = new Array();
var brightness_value_series = new Array();

var seriesOptions = [];
//var time_series = [ '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00','16:00', '17:00', '18:00'];

function query_all_values()
{
    console.log('CALLING query_all_values FUNCTION');
    seriesOptions = new Array();
    var sensor_values_exist = false;
    time_series = new Array();
    occupancy_series = new Array();
    energy_value_series = new Array();
    light_values_bool = true;
    temp_values_bool = true;
    hum_values_bool = true;
    co2_values_bool = true;
    energy_values_bool = true;
    var measurement_type; 
//    temperature_value_series = new Array();
//    humidity_value_series = new Array();
//    co2_value_series = new Array();
//    brightness_value_series = new Array();
    var count = 0;
    //first check to see which data types are checked (currently +1 because occupancy is not included in sensor_types array)
    var s_array = sensor_types.keys();
    console.log(s_array.length);
    for(var i = 0; i<s_array.length+1; i++)
    {
        console.log('Testing');
        if($('#m_c_'+(i+1)).is(":checked"))
        {  
            if($('#m_c_'+(i+1)).val()==='occupancy')
            {

                sparql_query_zone_occupancy(document.getElementById('monitoring_user_id_div').value, document.getElementById('monitoring_time_picker_start').value, document.getElementById('monitoring_time_picker_end').value, document.getElementById('monitoring_zone_id_div').value);
                seriesOptions[count] = {
                    name: 'Occupancy',
                    data: occupancy_series
                };
                count++;
                console.log("Adding "+$('#m_c_'+(i+1)).val()+" with value "+ input_series.toString());// + " to series:" + count);
                
            }
            else if($('#m_c_'+(i+1)).val()==='Energy')
            {        
                for(var j = 0; j<sensor_array.length; j++)
                {
               
                    if(sensor_array[j].type==='Energy')
                    {
                        measurement_type = 'kWh';
//                        console.log(sensor_array[j].zone_id);
//                        console.log(current_activity_zone.symbolic);
                        if(sensor_array[j].zone_id===current_activity_zone.symbolic)
                        {
                            if(energy_values_bool)
                            {
                                energy_values_bool = false//hack to remove dupliocation
                                sensor_values_exist = true;
                                get_database_values($('#monitoring_time_picker_start').val(), $('#monitoring_time_picker_end').val(), parser_time_string(), sensor_array[j].id, $('#m_c_'+(i+1)).val(), measurement_type, buildings[current_building]);

                                energy_value_series = convert_string_array_to_number_array(energy_value_series);                                       
                                console.log("Adding "+$('#m_c_'+(i+1)).val()+" with value "+ energy_value_series.toString() + " to series: " + count);
                                seriesOptions[count] = {
                                name: 'kWh',
                                data: energy_value_series
                                };
                                count++;
                            }
                        }
                        
                    }
                }
            }
            else if($('#m_c_'+(i+1)).val()==='CO2')
            {
                for(var j = 0; j<sensor_array.length; j++)
                {
                    if(sensor_array[j].type==='CO2')
                    {
                        
                        measurement_type = 'ppm';
                        
                        if(sensor_array[j].zone_id===current_activity_zone.symbolic)
                        {
                            if(co2_values_bool)
                            {
                                co2_values_bool = false//hack to remove dupliocationsensor_values_exist = true;
                                sensor_values_exist = true;
                                get_database_values($('#monitoring_time_picker_start').val(), $('#monitoring_time_picker_end').val(), parser_time_string(), sensor_array[j].id, $('#m_c_'+(i+1)).val(), measurement_type, buildings[current_building]);

    //                            j = sensor_array.length;                      
                                energy_value_series = convert_string_array_to_number_array(energy_value_series);
                                console.log("Adding "+$('#m_c_'+(i+1)).val()+" with value "+ energy_value_series.toString() + " to series: " + count);
                                seriesOptions[count] = {
                                    name: 'ppm',
                                    data: energy_value_series
                                };
                                count++;
                            }
                        }
                     
                    }                
                }
            }
            else if($('#m_c_'+(i+1)).val()==='Humidity')
            {
                for(var j = 0; j<sensor_array.length; j++)
                {

                    if(sensor_array[j].type==='Humidity')
                    {
                        
                        measurement_type = 'Percentage';

                        if(sensor_array[j].zone_id===current_activity_zone.symbolic)
                        {                            
                            if(hum_values_bool)
                            {
                                hum_values_bool = false//hack to remove dupliocationsensor_values_exist = true;
                                sensor_values_exist = true;
                                get_database_values($('#monitoring_time_picker_start').val(), $('#monitoring_time_picker_end').val(), parser_time_string(), sensor_array[j].id, $('#m_c_'+(i+1)).val(), measurement_type, buildings[current_building]);

    //                            j = sensor_array.length;                      

                                console.log("Adding "+$('#m_c_'+(i+1)).val()+" with value "+ energy_value_series.toString() + " to series: " + count);
                                energy_value_series = convert_string_array_to_number_array(energy_value_series);
                                seriesOptions[count] = {
                                name: '%Humidity',
                                data: energy_value_series
                                };
                                count++;
                            }
                        }
                        
                    }               
                }
            }
            else if($('#m_c_'+(i+1)).val()==='Temperature')
            {
                for(var j = 0; j<sensor_array.length; j++)
                {
                    if(sensor_array[j].type==='Temperature')
                    {
                        
                        measurement_type = 'Celsius';
                        
                        if(sensor_array[j].zone_id===current_activity_zone.symbolic)
                        {
                            if(temp_values_bool)
                            {
                                temp_values_bool = false//hack to remove dupliocationsensor_values_exist = true;
                                sensor_values_exist = true;
                                get_database_values($('#monitoring_time_picker_start').val(), $('#monitoring_time_picker_end').val(), parser_time_string(), sensor_array[j].id, $('#m_c_'+(i+1)).val(), measurement_type, buildings[current_building]);

                                energy_value_series = convert_string_array_to_number_array(energy_value_series);
                                console.log("Adding "+$('#m_c_'+(i+1)).val()+" with value "+ energy_value_series.toString() + " to series: " + count);
                                seriesOptions[count] = {
                                name: 'Celsius',
                                data: energy_value_series
                                };
                                count++;
                            }
                        }
           
                    }                
                }
            }
            else if($('#m_c_'+(i+1)).val()==='Brightness')
            {
                for(var j = 0; j<sensor_array.length; j++)
                {
                    if(sensor_array[j].type==='Brightness')
                    {
                        
                        measurement_type = 'Klux';
                        
                        if(sensor_array[j].zone_id===current_activity_zone.symbolic)
                        {                                  
                            if(light_values_bool)
                            {
                                light_values_bool = false//hack to remove dupliocationsensor_values_exist = true;
                                sensor_values_exist = true;
                                get_database_values($('#monitoring_time_picker_start').val(), $('#monitoring_time_picker_end').val(), parser_time_string(), sensor_array[j].id, $('#m_c_'+(i+1)).val(), measurement_type, buildings[current_building]);

                                energy_value_series = convert_string_array_to_number_array(energy_value_series);
                                console.log("Adding "+$('#m_c_'+(i+1)).val()+" with value "+ energy_value_series.toString() + " to series: " + count);
                                seriesOptions[count] = {
                                name: 'Klux',
                                data: energy_value_series
                                };
                                count++;
                            }
                        }

                    }             
                }
            }
        }
        
        
    }
    if(sensor_values_exist){
        
        console.log('Creating Highchart for sensor values');
        create_highchart();
        
    }
    else alert('Zone ' + current_activity_zone.symbolic + ' contain no sensors, or you must tick a sensor type under "Available Sensors".');
 
}


function create_highchart(){

        console.log('CALLING create_highchart FUNCTION');
        console.log('HIGHCHARTS VALUES: ' + energy_value_series);
        console.log('HIGHCHARTS TIME: ' + time_series);
        var zone = current_activity_zone.symbolic;
        if(zone==='Office')
        {
            zone = 'Select a Zone and Query Sensor Value to Display Chart'
        }
//        energy_value_series = [0.009,0.009,0.009,0.009,0.009,0.009,0.009];
//        time_series = ['13:05','13:10','13:20','13:30','13:35','13:45','13:50'];
//        input_series = input_series.slice(6, input_series.length-5);
        
//        seriesOptions[0] = {
//            name: 'Occupancy',
//            data: input_series
//        };
//        console.log(input_series);
//        seriesOptions = uniq(seriesOptions, [].join); //This is a hack for the moment, as there seems to be duplicates in the array which I cannot track down the cause
//        remove_array_duplicates(seriesOptions);
        console.log('Size of series array:' + seriesOptions.length);
        
        for(var i = 0; i<seriesOptions.length; i++)
        {
            console.log(seriesOptions[i].name.toString());    
            console.log(seriesOptions[i].data.toString());          
        }    
        chart = new Highcharts.Chart({
            chart: {
                    renderTo: 'chartViz2',
                    type: 'line',
                    marginRight: 130,
                    marginBottom: 25
            },
            title: {
                    text: '',
                    x: -20 //center
            },
            subtitle: {
                    text: zone,
                    x: -20
            },
            xAxis: {
                    categories: time_series
            },
            yAxis: {
                    title: {
                            text: ''
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
            series: seriesOptions
//            series: [{
//                    name: 'Energy',
//                    data: energy_value_series
//            }]
        });         

//    var chart = new Highcharts.Chart(highchart);
    
}

uniq = function(items, key) {
    var set = {};
    return items.filter(function(item) {
        var k = key ? key.apply(item) : item;
        return k in set ? false : set[k] = true;
    })
}
function remove_array_duplicates(array)
{
    
    for(var i = 0; i < array.length; i++) {
        for(var j = i + 1; j < array.length; ) {
            if(array[i][0] == array[j][0] && array[i][1] == array[j][1])
                // Found the same. Remove it.
                array.splice(j, 1);
            else
                // No match. Go ahead.
                j++;
        }    
    }

}