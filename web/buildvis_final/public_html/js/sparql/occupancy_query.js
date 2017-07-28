function Zone_Occupancy_Model(zone_id, start_time, end_time, date, user_ids, user_occupancy, activity_type){
    
    this.zone_id = zone_id;
    this.start_time = start_time;
    this.end_time = end_time;
    this.date = date;
    this.user_ids = user_ids;
    this.user_occupancy = user_occupancy;
    this.activity_type = activity_type;
        
}
var monitoring_time_interval = 60;
function set_monitoring_time_interval(i){
    
    monitoring_time_interval = i;
    
}
function addMinutes(date, minutes) {
    
    return new Date(date.getTime() + minutes*60000);
    
}

function create_time_series(time_steps, start_time, end_time){
    
    time_series = new Array();
    var sd = $("#monitoring_date_picker").datepicker('getDate');
    var hours = start_time.substring(0, 2);
    var mins = start_time.substring(3,5);
    sd.setHours(hours);
    sd.setMinutes(mins);

    var ed = $("#monitoring_date_picker").datepicker('getDate');
    hours = end_time.substring(0, 2);
    mins = end_time.substring(3,5);
    ed.setHours(hours);
    ed.setMinutes(mins);
    
    time_series.push(start_time);
    
    if(time_steps!==0)
    {
        while(sd<ed){
            sd = addMinutes(sd, time_steps);
            hours = sd.getHours();
            if(hours<10)
            {
               hours = "0"+hours; 
            }
            mins = sd.getMinutes();
            if(mins<10)
            {
               mins = "0"+mins; 
            }
//            console.log(hours+":"+mins);
            time_series.push(hours+":"+mins);
        }
        
    }
    
    return time_series;
    
}


function populate_occupancy_series_no_lunch(start_time_break, duration_break, time_series)
{
    occupancy_series = new Array();
    var d = $("#monitoring_date_picker").datepicker('getDate');
    
    var sd = $("#monitoring_date_picker").datepicker('getDate');
    sd = sd.getTime();
    sd = sd + (3600000*parseInt(start_time_break.substring(0, 2)));
    sd = sd + (60000*parseInt(start_time_break.substring(3,5)));

    var ed = sd + (parseInt(duration_break));
    
//    ed.setTime(ed.getTime() + duration_break);
//    console.log(time_series.length);
    for(var i=0; i<time_series.length; i++)
    {
//        console.log(time_series[i]);
        hours = time_series[i].substring(0, 2);
        mins = time_series[i].substring(3,5);
        d.setHours(hours);
        d.setMinutes(mins);
//        console.log(sd);
//        console.log(d.getTime());
//        console.log(ed);
        if((d.getTime()>=sd)&&(d.getTime()<=ed)){
            occupancy_series.push(1);
//            console.log(occupancy_series[i]);
        }
        else
        {
            occupancy_series.push(0);
//            console.log(occupancy_series[i]);
        }
        
    }

    return occupancy_series;
    
}
function populate_occupancy_series(start_time_break, duration_break, time_series, start_lunch_time, duration_lunch)
{
    occupancy_series = new Array();
    var d = $("#monitoring_date_picker").datepicker('getDate');
    
    var sd = $("#monitoring_date_picker").datepicker('getDate');
    sd = sd.getTime();
    sd = sd + (3600000*parseInt(start_time_break.substring(0, 2)));
    sd = sd + (60000*parseInt(start_time_break.substring(3,5)));
    
    var ed = sd + (parseInt(duration_break));
    
    var lsd = $("#monitoring_date_picker").datepicker('getDate');
    lsd = lsd.getTime();
    lsd = lsd + (3600000*parseInt(start_lunch_time.substring(0, 2)));
    lsd = lsd + (60000*parseInt(start_lunch_time.substring(3,5)));
    
    var esd = $("#monitoring_date_picker").datepicker('getDate');
    esd = lsd + (parseInt(duration_lunch));


    
//    ed.setTime(ed.getTime() + duration_break);
    console.log(time_series.length);
    for(var i=0; i<time_series.length; i++)
    {
//        console.log(time_series[i]);
        hours = time_series[i].substring(0, 2);
        mins = time_series[i].substring(3,5);
        d.setHours(hours);
        d.setMinutes(mins);
//        console.log(sd);
//        console.log(d.getTime());
//        console.log(ed);
        
        if((d.getTime()>=sd)&&(d.getTime()<=ed)){
            
//            console.log("True");
            if((d.getTime()>=lsd)&&(d.getTime()<=esd)){
                occupancy_series.push(0);
                console.log(occupancy_series[i]);
            }
            else
            {
                occupancy_series.push(1);
                console.log(occupancy_series[i]);  
            }
        }
        else
        {
            occupancy_series.push(0);
            console.log(occupancy_series[i]);
        }
        
    }

    return occupancy_series;
    
}
function sparql_query_zone_occupancy(user_id, hasStartTime, hasEndTime, hasZoneID){
    
//    alert("Test!");
    
    var time_series = create_time_series(monitoring_time_interval, hasStartTime, hasEndTime);
    
    
    var day1 = $("#monitoring_date_picker").datepicker('getDate').getDate();
    if(day1<10)
    {
        day1 = "0" + day1;
    }
    var month1 = $("#monitoring_date_picker").datepicker('getDate').getMonth() + 1;     
//    if(month1<10)
//    {
//        month1 = "0" + month1;
//    }
    var year1 = $("#monitoring_date_picker").datepicker('getDate').getFullYear();
    var fullDate = day1 + "-" + month1 + "-" + year1;
    var user_ids = new Array();
    var start_times = new Array();
    var duration = new Array();
    var start_dates = new Array();
    
    var query = "SELECT ?lunchBreak ?user_id ?duration ?startTime ?start_date ?symbolicPlacementFrom"+
        " WHERE{"+
        "?lunchBreak  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Lunch>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?user_id."+
        "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
        "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
        "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+user_id+"\"."+
        "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+fullDate+"\"."+
        "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom>  ?pathFrom."+
        "?pathFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementFrom."+
        "?placementFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> \""+hasZoneID+"\"."+// \""+hasZoneID+"\"."+
        "}";

    console.log(query);
    var result_object = sparql_query (query);

    if(result_object.results.bindings.length!==0)
    {
        
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
            
            user_ids.push(result_object.results.bindings[0].user_id.value);
            start_times.push(result_object.results.bindings[0].startTime.value);
            duration.push(result_object.results.bindings[0].duration.value);
            start_dates.push(fullDate);
            console.log("User ID: " + user_ids[i]);  
            console.log("Start Time: " + start_times[i]);  
            console.log("Duration: " + duration[i]);  
            console.log("Start Dates: " + start_dates[i]);
            
        }


    }

    var query = "SELECT ?officeActivity ?user_id ?duration ?startTime ?start_date ?symbolicPlacementFrom"+
        " WHERE{"+
        "?officeActivity  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeWork>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?user_id."+
        "?officeActivity  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
        "?officeActivity  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
        "?officeActivity  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+user_id+"\"."+
        "?officeActivity  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+fullDate+"\"."+
        "?officeActivity  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom>  ?pathFrom."+
        "?pathFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementFrom."+
        "?placementFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> \""+hasZoneID+"\"."+// \""+hasZoneID+"\"."+
        "}";

    console.log(query);
    var result_object = sparql_query (query);
//    console.log(start_times.length);
    if(result_object.results.bindings.length!==0)
    {
        
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
            
            user_ids.push(result_object.results.bindings[0].user_id.value);
            start_times.push(result_object.results.bindings[0].startTime.value);
            duration.push(result_object.results.bindings[0].duration.value);
            start_dates.push(fullDate);
            console.log("User ID: " + user_ids[i]);  
            console.log("Start Time: " + start_times[i]);  
            console.log("Duration: " + duration[i]);  
            console.log("Start Dates: " + start_dates[i]);
            
        }

        var query = "SELECT ?lunchBreak ?user_id ?duration ?startTime ?start_date ?symbolicPlacementFrom"+
            " WHERE{"+
            "?lunchBreak  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Lunch>;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?user_id."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+user_id+"\"."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+fullDate+"\"."+
            "}";

        console.log(query);
        var result_object = sparql_query (query);

        if(result_object.results.bindings.length!==0)
        {

            for(var i = 0; i<result_object.results.bindings.length; i++)
            {

                user_ids.push(result_object.results.bindings[0].user_id.value);
                start_times.push(result_object.results.bindings[0].startTime.value);
                duration.push(result_object.results.bindings[0].duration.value);
                start_dates.push(fullDate);
                console.log("User ID: " + user_ids[i]);  
                console.log("Start Time: " + start_times[i]);  
                console.log("Duration: " + duration[i]);  
                console.log("Start Dates: " + start_dates[i]);

            }


        }


    }
    
    
//    var occupancy_series;
    if(user_ids.length===0)
    {
        
        console.log("No Activity for this date or room.");
        
    }
    else if(user_ids.length>1)
    {
        
//        occupancy_series = 
                populate_occupancy_series(start_times[0], duration[0], time_series, start_times[1], duration[1], true);
        
    }
    else
    {
//        console.log(start_times.length);
//        occupancy_series = 
                populate_occupancy_series_no_lunch(start_times[0], duration[0], time_series);      
        
    }

    
    
//    for(var i=0; i<occupancy_series.length; i++)
//    {
//        console.log(occupancy_series[i]);
//        
//    }
    
    
//    highchart = new Highcharts.Chart({
//        chart: {
//                renderTo: 'chartViz2',
//                type: 'line',
//                marginRight: 130,
//                marginBottom: 25
//        },
//        title: {
//                text: 'Daily Energy Consumption',
//                x: -20 //center
//        },
//        subtitle: {
//                text: 'Media-TIC',
//                x: -20
//        },
//        xAxis: {
//                categories: time_series
//        },
//        yAxis: {
//                title: {
//                        text: "occupancy"
//                },
//                plotLines: [{
//                        value: 0,
//                        width: 1,
//                        color: '#808080'
//                }]
//        },
//        tooltip: {
//                formatter: function() {
//                                return '<b>'+ this.series.name +'</b><br/>'+
//                                this.x +': '+ this.y +'Present';
//                }
//        },
//        legend: {
//                layout: 'vertical',
//                align: 'right',
//                verticalAlign: 'top',
//                x: -10,
//                y: 100,
//                borderWidth: 0
//        },
//        series: [{
//                data: occupancy_series,
//                name: "Occupancy"
//
//        }]
//    });
//    var chart = new Highcharts.Chart(highchart);
    
    
}//END OF FUNCTION

