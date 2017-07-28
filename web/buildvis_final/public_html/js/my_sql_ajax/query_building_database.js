var id;
/*
 * @author Kris McGlinn, TCD
 * 
 * **ANTON - YOU CAN MESS AROUND WITH THESE TO EXECUTE THE PHP CODE STORED IN THE PHP FOLDER
 */
function parser_time_string()
{

        var date = $("#monitoring_date_picker").datepicker('getDate');
        var day  = date.getDate();  
        if(day<10){
            day = "0"+day;
        }
        var month = date.getMonth() + 1;
        if(month<10){
            month = "0"+month;
        }
        var year =  date.getFullYear();


    return month+"/"+day+"/"+year;

}
function open_mysql_connection(building_id){

    console.log('Writing activity data to sql data base');
    
    $.ajax({
        async: false,
        type: "POST",
        url: "php/open_connection.php",
        dataType: 'json',
        data: {building_id:building_id},
        success: function(msg){
            console.log( "Connection Open: " + msg );
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        } 
//    }).done(function( result ) {
//        console.log("$.get succeeded");
//        console.log($.parseJSON(result.time));    
    });
    
}
function close_mysql_connection(building_id){

    console.log('Writing activity data to sql data base');
    
    $.ajax({
        async: false,
        type: "POST",
        url: "php/close_connection.php",
        dataType: 'json',
        data: {building_id:building_id},
        success: function(msg){
            console.log( "Connection Open: " + msg );
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        } 
//    }).done(function( result ) {
//        console.log("$.get succeeded");
//        console.log($.parseJSON(result.time));    
    });
    
}
function write_database_values(time, id, type, value, user_id, zone_id, building_id){

//    console.log('Writing activity data to sql data base for building: ' + building_id);
    
    $.ajax({
        async: false,
        type: "POST",
        url: "php/writeDataBaseValues.php",
        dataType: 'Text',
        data: {time:time, id:id, type:type, value:value, u_id:user_id, z_id:zone_id, building_id:building_id},
        success: function(msg){
//            console.log( "Data Saved: " + msg );
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        } 
//    }).done(function( result ) {
//        console.log("$.get succeeded");
//        console.log($.parseJSON(result.time));    
    });
    
}
//function get_database_values(time, id, activity, value){
//function get_database_values(sTime, eTime, date, id){
//    
//    console.log('Querying SQL Database for date: ' + date + ' start time: '+ sTime +' end time: ' + eTime + ' id: '+ id);
//    $.ajax({
//    async: false,
//    type: "POST",
//    url: "php/getDataBaseValues.php",
//    dataType: 'script',
////    data: {time:time, id:id, activity:activity, value:value}
//    data: {date:date, sTime:sTime, eTime:eTime, id:id}
//    }).done(function( result ) {
//        console.log("$ajax.get succeeded");
//        console.log('Returned String' + result);
//        time_series = result.substring(0, result.indexOf('*'));
//        input_series = result.substring(result.indexOf('*')+1, result.length);
//        console.log('Time Series: ' + time_series);
//        console.log('Input Series: ' + input_series);
////        time_series = $.parseJSON(time_series);
////        input_series = $.parseJSON(input_series);  
////        console.log("AJAX UPDATING ENERGY VALUE SERIES" + $.parseJSON(result.sensor_value));
////        }
//        
//    });
////    result = '{"time":"[\"13:05\",\"13:10\",\"13:20\",\"13:30\",\"13:35\",\"13:45\",\"13:50\"]","sensor_value":"[0.009,0.009,0.009,0.009,0.009,0.009,0.009]"}';
//    console.log('Finished Querying SQL Database');
////    console.log($.parseJSON(result.time));
////    console.log($.parseJSON(result.sensor_value));
////    time_series = $.parseJSON(result.time);
////    input_series = $.parseJSON(result.sensor_value);  
//   }


function get_database_values(sTime, eTime, date, id, type, mType, building_id){
    
    console.log('CALLING get_database_values FUNCTION');
    console.log('Querying SQL Database for date: ' + date + ' start time: '+ sTime +' end time: ' + eTime + ' id: '+ id + ' measurement_type: '+ mType + ' building id: '+ building_id);
    $.ajax({
    async: false,
    type: "POST",
    url: "php/getDataBaseValues.php",
    dataType: 'json',
//    data: {time:time, id:id, activity:activity, value:value}
    data: {date:date, sTime:sTime, eTime:eTime, id:id, mType:mType, type:type, building_id:building_id}
    }).done(function( result ) {
        console.log("$ajax.get succeeded");
//        console.log('Returned String' + result);
//        time_series = result.substring(0, result.indexOf('*'));
//        input_series = result.substring(result.indexOf('*')+1, result.length);
//        console.log('Time Series: ' + time_series);
//        console.log('Input Series: ' + input_series);
        time_series = result.time;
        energy_value_series = result.sensor_value;
        console.log("AJAX SETTING VALUE SERIES: " + energy_value_series);
        console.log("AJAX SETTING TIME SERIES: " + time_series);
//        }
        
    });
//    result = '{"time":"[\"13:05\",\"13:10\",\"13:20\",\"13:30\",\"13:35\",\"13:45\",\"13:50\"]","sensor_value":"[0.009,0.009,0.009,0.009,0.009,0.009,0.009]"}';
    console.log('Finished Querying SQL Database');

   }