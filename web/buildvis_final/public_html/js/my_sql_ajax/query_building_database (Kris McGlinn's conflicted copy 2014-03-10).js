var id;

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
function write_database_values(time, id, type, value, user_id, zone_id){

    console.log('Writing activity data to sql data base');
    
    $.ajax({
        async: false,
        type: "POST",
        url: "php/writeDataBaseValues.php",
        dataType: 'json',
        data: {time:time, id:id, type:type, value:value, u_id:user_id, z_id:zone_id},
        success: function(msg){
            console.log( "Data Saved: " + msg );
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
//
//    $.ajax({
//    async: false,
//    type: "POST",
//    url: "php/getDataBaseValues.php",
//    dataType: 'json',
//    data: {time:time, id:id, activity:activity, value:value}
//    }).done(function( result ) {
//        console.log("$.get succeeded");
//        console.log($.parseJSON(result.time));
//
//        
//    });
//   }
