// * Javascript name: office_user_activities_sparql
// *
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
// 
// $.getScript('/path/to/imported/script.js', function()
// {
//     // script is now loaded and executed.
//     // put your dependent JS here.
// });
// */

//$(function () {

var overwrite = true;

var iActivities = new Array("Toilet", "Printer", "Drink", "Smoke");

var userID, officeName, roomName;
var queryDate, currentDate, storeDate, currentDay, currentMonth, currentYear, startDay, daysInMonth;

function set_start_date()
{
    var date = $( "#datepicker" ).datepicker('getDate');
//    console.log("date.getMonth() is " + date.getMonth());
//    currentDate = $( "#datepicker" ).datepicker('getDate');
//    currentDate.setMonth(date.getMonth() + 1);
    currentDay = date.getDate();
//    console.log("Setting Current Day: " + currentDay);
    currentMonth = date.getMonth()+1;
//    console.log("Setting Current Month: " + currentMonth);
    currentYear = date.getFullYear();
//    console.log("Setting Current Year: " + currentYear);
    daysInMonth = days_In_Month(currentMonth, currentYear);
//    console.log("Days in Month: " + daysInMonth);
    queryDate = currentYear + "-" + currentMonth + "-" + currentDay;    
}
function set_current_date()
{
//    currentDay = currentDate.getDate();
//    currentMonth = currentDate.getMonth();
//    currentYear = currentDate.getFullYear();
    queryDate = currentDay + "-" + currentMonth + "-" + currentYear;    
}
function days_In_Month(month,year) {
    return new Date(year, month, 0).getDate();
}



function parse_ID_Json(jsonObj) 
{
//    var d = new Date();
//    log_data = log_data + d.getTime()  + "parseIDJson\n";
    //alert(jsonObj);
//    
//    var date = $( "#datepicker" ).datepicker('getDate');
//    currentDay = date.getDate();
    userID = jsonObj[0][0];
    roomName = jsonObj[1][0];
    officeName = "R"+jsonObj[1][0];

    //alert("OfficeName: " + officeName + ", UserID: " + userID + ", StartDay" + startDay + ", Month: " + month + ", Year: " + year);
}

function convertDayInt(d)
{

    var stringDay;
    if(d<10)
            {stringDay = "0"+(d);}
    else 
            {stringDay = (d);}

    //alert(stringDay);
    return stringDay;

}

function checkAndDelete(activityType, queryDate, userID, type){
    
    var query = "SELECT ?activityType "+
        "WHERE{"+
        "?activityType  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+activityType+">;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+userID+"\"."+
        "?activityType  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+queryDate +"\"."+
        "?activityType  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasIntermediateActivityType> \""+ type +"\"."+
        "}";

    var result_object = sparql_query (query);
    alert(query);
    if(result_object.results.bindings!="")
    {
        alert("This activity exists!");
    }
    
}

function deleteActivities(queryDate, userID){
    //Currently only deleting break activities!!!
    deleteBreakActivities("IntermediateActivity", queryDate, userID);

}

function deleteIntermediateActivities(queryDate, userID){
//    var d = new Date();
//    log_data = log_data + d.getTime()  + "deleteBreakActivities\n";

//    var dateArr = queryDate.split("-");
//    var dateArray = dateArr[2].split("");


//    for(var d = 0; d < 7; d++)
//    {
//        var day1 = eval(dateArray[0]);
//        var day2 = eval(dateArray[1]);
//        var day = day2+currentDay;
//        if (day>9)
//        {
//            day2 = day2+1;
//            day = day - 10;
//        }
    for(var i = iActivities.length-1; i> 0; i--)
    {

        var query = "DELETE DATA{"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#IntermediateActivity"+userID+iActivities[i]+queryDate+">"+
        "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type><http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#IntermediateActivity>;"+
        "}";
        console.log(query);
        result_object = sparql_delete (query);
    //alert(query);

    }
//    }
    
}
/////////////////////////////////

function testDates(activityName){

//    console.log("TEST");
    var arrayDay = new Array();
    var count = 0;
    set_current_date();
    for(var i = 0; i<7;i++)
    {
        //alert(i);
        var query = "SELECT ?officeWork "+
            "WHERE{"+
            "?officeWork  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+activityName+">;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+userID+"\"."+
            "?officeWork  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+queryDate +"\"."+
            "}";
//        console.log(query);
        var result_object = sparql_query (query);
        //alert(JSON.stringify(result_object));
        //alert(result_object.results.bindings);
        if(result_object.results.bindings!=="")
        {
            
            arrayDay[count] = currentYear +"-"+currentMonth+"-"+convertDayInt(currentDay+i);
            //alert($("#year").val()+"-"+$("#month").val()+"-"+convertDayInt(day+i));
            count++;
        }	//END OF IF

    }//END OF FOR LOOP

    //alert("Test");	

    var arrayDayString = arrayDay[0];
    for(var i = 1; i<count;i++)
    {
            arrayDayString = arrayDayString + ", " + arrayDay[i];
    }//END OF FOR LOOP
    if(arrayDayString!==undefined){
        //alert("Warning, you have already entered activites for the following dates: " + arrayDayString);	
        var r=confirm("Warning, you have already entered activities for this activity: " + activityName + " for these dates: " + arrayDayString + ". Do you wish to overwrite your previous entries?");
        if (r===true)
        {
            overwrite=true;        
            deleteActivities(queryDate, userID);
        }//END OF IF
        else
        {
            overwrite=false;
        }//END OF ELSE

    }//END OF IF

    return overwrite;
    
}//END OF FUNCTION
function testBreaksDates(addDay){

//    console.log("TEST");
    var arrayActivity = new Array();
    var count = 0;
    set_current_date();
//    var activityDay = $("#dayOptionsId").val();
    console.log("activityDay: "+addDay);
    currentDay = currentDay+addDay;
    set_current_date();
    for(var j = 0; j<iActivities.length;j++)
    {
        var query = "SELECT ?iActivities "+
            "WHERE{"+
            "?iActivities  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#IntermediateActivity>;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+userID+"\"."+
            "?iActivities  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+queryDate +"\"."+
            "?iActivities  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasIntermediateActivityType> \""+iActivities[j] +"\"."+
            "}";
//        console.log(query);
        var result_object = sparql_query (query);
        //alert(JSON.stringify(result_object));
        //alert(result_object.results.bindings);
        if(result_object.results.bindings!=="")
        {

            arrayActivity[count] = iActivities[j];
            //alert($("#year").val()+"-"+$("#month").val()+"-"+convertDayInt(day+i));
            count++;
        }	//END OF IF

    }//END OF FOR LOOP

    //alert("Test");	

    var arrayDayString = arrayActivity[0];
    for(var i = 1; i<count;i++)
    {
            arrayDayString = arrayDayString + ", " + arrayActivity[i];
    }//END OF FOR LOOP
    if(arrayDayString!==undefined){
        //alert("Warning, you have already entered activites for the following dates: " + arrayDayString);	
        var r=confirm("Warning, you have already entered activities for intermediate activity types: " + arrayActivity + " on this date: " + queryDate + ". Do you wish to overwrite your previous entries?");
        if (r===true)
        {
            overwrite=true;        
            deleteIntermediateActivities(queryDate, userID);
        }//END OF IF
        else
        {
            overwrite=false;
        }//END OF ELSE

    }//END OF IF

    return overwrite;
    
}//END OF FUNCTION

//
//
//
//
//LUNCH BREAKS
//
//
//
/////////////////////////////////
//Query Lunch - This Function queries the ontology for all lunch breaks (start time, duration, path to and from)

function queryLunch(jsonObj){
    
    set_start_date();
//    var d = new Date();
//    log_data = log_data + d.getTime()  + "queryLunch\n";
    parse_ID_Json(jsonObj);

    var jsonString = "";

    for(var i=0; i<7;i++)
    {
        set_current_date();
        var query = "SELECT ?duration ?startTime ?pathNextToID ?pathNextFromID ?pTo ?pFrom "+
            "WHERE{"+
            "?lunchBreak  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Lunch>;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+userID+"\"."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+queryDate +"\"."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo>  ?pathTo."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom>  ?pathFrom."+
            "?pathTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
            "?pathTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
            "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
            "?pathFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementFrom."+
            "?pathFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextFrom."+
            "?pathNextFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextFromID."+
            "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
            "?placementFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pFrom." +
            "}";
        console.log(query);
        var result_object = sparql_query (query);
		
        //console.log(JSON.stringify(result_object));

        // get each binding (data point entry object) and append it to a "series" array
        var duration, start;
        
        if(result_object.results.bindings.length!==0)
        {
            duration = result_object.results.bindings[0].duration.value;
            console.log("Duration: " + duration);
            var duration_array = convertMS(duration);	
//            console.log("Days: " + duration_array[0]);
//            console.log("Hours: " + duration_array[1]);
//            console.log("Minutes: " + duration_array[2]);
//            console.log("Seconds: " + duration_array[3]);
            //alert(duration[1]);
            start = result_object.results.bindings[0].startTime.value;
            
            //Needs to be fixed up!
            //duration = duration.substring(2, 3);
            var startHours = start.substring(0, 2);
            var endHours = parseInt(start.substring(0, 2))+duration_array[1];
            var startMins = start.substring(3,5)
            var endMins = parseInt(start.substring(3,5));
//            console.log("startHours: " + startHours);
//            console.log("endHours: " + endHours);
//            console.log("startMins: " + startMins);
//            console.log("endMins: " + endMins);
            endMins = (endMins + duration_array[2]);
            if(endMins>59)
            {
                endMins = endMins-60;
                endHours++;
            }
            if(endMins===0)
            {
                endMins = "00";
            }
//            console.log("startHours: " + startHours);
//            console.log("endHours: " + endHours);
//            console.log("startMins: " + startMins);
//            console.log("endMins: " + endMins);
//            var pTo = result_object.results.bindings[0].pTo.value;
            var pFrom = result_object.results.bindings[0].pFrom.value;
            //alert(pFrom);
            //alert(result_object.results.bindings[0].pathNextToID.value);
            var pInterID = result_object.results.bindings[0].pathNextToID.value;
            var pInterPath = new Array();
            var pInterPathStringTo;
            var count = 0;
            var bool = true;
            
            while(bool)
            {
                var query = "SELECT ?pathNextToID ?pTo "+
                    "WHERE{"+
                    "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+pInterID+"\"."+
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
                    "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
                    "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
                    "}";

                //alert(JSON.stringify(query));
                var result_object_to = sparql_query (query);
                //alert(JSON.stringify(result_object));

                if(result_object_to.results.bindings==="")
                {
                    bool = false;
                } //END OF IF
                else if(pInterID==="pathEnd")
                {
                        bool = false;
                        //alert("Test");
                        //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
                        //	alert("Working");
                        //}
                }//END OF IF
                else
                {	
                    //Return the ID for the next query		
                    pInterID  = result_object_to.results.bindings[0].pathNextToID.value;
                    //alert("ID of Next"+pInterID);
                    //Return the pTo symbolic value
                    pInterPath[count] = result_object_to.results.bindings[0].pTo.value;
                    //Increase the count by one
                    count++;
                    //Set the fist value of the string as the value at position 0 of the array of symbolic points
                    pInterPathStringTo = pInterPath[0];
                    //alert("Test"+pInterPathStringTo);
                    //If the array is greater than 1 then 
                    for(var j = 1; j<count-1; j++){
                        //alert("Test2" + pInterPath[j]);
                        pInterPathStringTo = pInterPathStringTo + "-" + pInterPath[j];

                    } //END OF FOOR LOOP
                }//END OF ELSE
                    //alert("Count" + count + ":"+pInterPathStringTo);	
            } //END OF WHILE
                //alert("Final Count" + count + ":"+pInterPathStringTo);
            pInterID = result_object.results.bindings[0].pathNextFromID.value;
            pInterPath = new Array();
            var pInterPathStringFrom;
            bool = true;
            count = 0;

            while(bool)
            {
                var query = "SELECT ?pathNextToID ?pTo "+
                    "WHERE{"+
                    "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+pInterID+"\"."+
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
                    "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
                    "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
                    "}";

                var result_object_from = sparql_query (query);

                //alert(result_object_from.results.bindings[0].pathNextToID.value);

                //console.log(result_object.results.bindings);
                if(result_object_from.results.bindings==="")
                {

                }
                else if(pInterID==="pathEnd")
                {
                        bool = false;
                        //alert("Test");
                        //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
                        //	alert("Working");
                        //}
                }//END OF IF
                else
                {			
                    //result_object_from.results.bindings[0].pTo2.value;
                    pInterID  = result_object_from.results.bindings[0].pathNextToID.value;
                    pInterPath[count] = result_object_from.results.bindings[0].pTo.value;
                    //alert(result_object_from.results.bindings[0].pTo.value);
                    count++;
                    pInterPathStringFrom = pInterPath[0];
                    for(var j = 1; j<count-1; j++)
                    {
                            pInterPathStringFrom = pInterPathStringFrom + "-" + pInterPath[j];
                    }//END OF FOR LOOP
                }//END OF ELSE
            }//END OF WHILE
	    console.log(parseInt(endHours, 10));
            console.log(duration[1]);
            jsonString  = jsonString + "[\""+startHours+":"+startMins+"\", \""+(parseInt(endHours, 10))+":"+endMins+"\", \""+pFrom+"\", \""+pInterPathStringTo+"\",\""+pInterPathStringFrom+"\"],";

        } 
        else 
        {
            //alert("It did equal 1!");
            jsonString  = jsonString + "[\"\", \"\", \"\", \"\", \"\"],";

        }
        currentDay++;
        if(currentDay > daysInMonth)
        {
            currentDay = 1;
            currentMonth++;
        }
    }

    jsonString = "{\"data\": ["+jsonString+"]}";
    
    var d = new Date();
    log_data = log_data + d.getTime() + jsonString;


    var jsonObject = eval("(" + jsonString + ")");
    console.log (jsonString);

    return jsonObject;

} //END OF FUNCTION

//UPDATE LUNCH BREAKS - This Function queries the ontology for day begining and start times (start time, duration, path to and from)

function parseLunchScheduleJson(jsonObj) {
//    
//    var d = new Date();
//    log_data = log_data + d.getTime()  + "parseLunchScheduleJson\n";
    set_start_date();
    if(overwrite === false)
    {
        overwrite = testDates("Lunch");
    }

    if(overwrite === true)
    {

        var sTime, eTime, enPath, exit, exPath, duration = undefined;
        //alert(jsonObj.length);
        for(var i = 0; i<jsonObj.length; i++)
        {
          
            sTime = jsonObj[i][0];
            if(sTime!==null)
            {//Start time is taken from jsonobject returned from Handsontable
                //Calculate DURATION
                var date = $( "#datepicker" ).datepicker('getDate');
                date.setHours(sTime.substring(0, 2));
                date.setMinutes(sTime.substring(3, 5));
//                console.log(sTime);
//                console.log(sTime.substring(3, 5));
                eTime = jsonObj[i][1];
                var date2 = $( "#datepicker" ).datepicker('getDate');
                date2.setHours(eTime.substring(0, 2));
                date2.setMinutes(eTime.substring(3, 5));
//                console.log(eTime.substring(3, 5));
                duration = date2 - date;

                exit = jsonObj[i][2]; //Indicates destination (where lunch takes place)
                enPath = jsonObj[i][3]; //Indicates path taken (to location of lunch)
                exPath = jsonObj[i][4]; //Indicates path returned (from of lunch to work place/office)
                //alert(jsonObj[i][4]);

                var pathTo = checkPathTo(officeName, enPath, exit); //bobbb
                var pathFrom = checkPathFrom(exit, exPath, officeName);
                set_current_date();
                //Must fix start day by converting to integer to add "i"
                query = "DELETE WHERE{"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?userID."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> ?queryDate."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo> ?pathTo."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom> ?pathFrom."+
                    "}" 
                
                sparql_delete (query);
                var query = "";

                query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
                        "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Lunch>; "+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \"" + userID +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \"" + queryDate +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> \"" + sTime + ":00\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> \""+ duration + "\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+pathTo+">;"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+pathFrom+">;}";
                console.log(query);
                if(sTime!=="")
                {
                    sparql_update (query);
                }

            }
            currentDay++;
            if(currentDay > daysInMonth)
            {
                currentDay = 1;
                currentMonth++;
            }
        }
    }
    
	//console.log (jsonObj); // print it out series to console for checking

}
/////////////////////////////
//
//
//
// DAY START END
//
//
//
//
//
//////

function queryStartEnd(jsonObj) 
{
    set_start_date();

    var jsonString = "";

    for(var  i=0; i<7;i++)
    {


        set_current_date();
        var query = "SELECT ?duration ?startTime ?pathNextToID ?pathNextFromID ?pTo ?pFrom "+
            "WHERE{"+
            "?officeWork  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeWork>;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+userID+"\"."+
            "?officeWork  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+queryDate +"\"."+
            "?officeWork  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
            "?officeWork  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
            "?officeWork  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo>  ?pathTo."+
            "?officeWork  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom>  ?pathFrom."+
            "?pathTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
            "?pathTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
            "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
            "?pathFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementFrom."+
            "?pathFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextFrom."+
            "?pathNextFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextFromID."+
            "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
            "?placementFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pFrom." +
            "}";

        var result_object = sparql_query (query);
        //alert(JSON.stringify(result_object));
        /// get each binding (data point entry object) and append it to a "series" array
        var duration, start;
        if(result_object.results.bindings.length!==0)
        {

            duration = result_object.results.bindings[0].duration.value;
            //alert("Duration" + duration);

            duration = convertMS(duration);	
            //alert(duration);
            start = result_object.results.bindings[0].startTime.value;
            //Needs to be fixed up!
            //duration = duration.substring(2, 3);
            var hours = start.substring(0, 2);
            var mins = start.substring(3,5);
            var pTo = result_object.results.bindings[0].pTo.value;
//            var pFrom = result_object.results.bindings[0].pFrom.value;
            //alert(pFrom);
            //alert(result_object.results.bindings[0].pathNextToID.value);
            var pInterID = result_object.results.bindings[0].pathNextToID.value;
            var pInterPath = new Array();
            var pInterPathStringTo;
            var count = 0;
            var bool = true;
            while(bool)
            {
				//alert("Count" + count + " ID: " +pInterID);
                var query = "SELECT ?pathNextToID ?pTo "+
                    "WHERE{"+
                    "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+pInterID+"\"."+
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
                    "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
                    "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
                    "}";
                console.log(query);
                var result_object_to = sparql_query (query);
                //alert(JSON.stringify(result_object));
                //alert(result_object.results.bindings[0].pathNextToID.value);

                //console.log(result_object.results.bindings);
                if(result_object_to.results.bindings==="")
                {
                    bool = false;
                    //alert("Test");
                    //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
                    //	alert("Working");
                    //}
                }//END OF IF
                else if(pInterID==="pathEnd")
                {
                        bool = false;
                        //alert("Test");
                        //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
                        //	alert("Working");
                        //}
                }//END OF IF
                else
                {			
                    pInterID  = result_object_to.results.bindings[0].pathNextToID.value;
                    pInterPath[count] = result_object_to.results.bindings[0].pTo.value;
                    //alert(pInterPath[count]);
                    count++;
                    pInterPathStringTo = pInterPath[0];
                    for(var j = 1; j<count-1; j++)
                    {
                        pInterPathStringTo = pInterPathStringTo + "-" + pInterPath[j];
                    }//END OF FOR LOOP	
                }//END OF ELSE
            }//END OF WHILE
                //alert(pInterPathStringTo);

            pInterID = result_object.results.bindings[0].pathNextFromID.value;
            pInterPath = new Array();
            var pInterPathStringFrom;
            bool = true;
            count = 0;
            while(bool){
                //alert("Count" + count + " ID: " +pInterID);
                var query = "SELECT ?pathNextToID ?pTo "+
                    "WHERE{"+
                    "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+pInterID+"\"."+
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
                    "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
                    "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
                    "}";
                //alert(query);
                var result_object_from = sparql_query (query);
                //alert(JSON.stringify(result_object));
                //alert(result_object_from.results.bindings[0].pathNextToID.value);

                //console.log(result_object.results.bindings);
                if(result_object_from.results.bindings==="")
                {
                        bool = false;
                        //alert("Test");
                        //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
                        //	alert("Working");
                        //}
                }//END OF IF
                else if(pInterID==="pathEnd")
                {
                        bool = false;
                        //alert("Test");
                        //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
                        //	alert("Working");
                        //}
                }//END OF IF
                else
                {			
                        //result_object_from.results.bindings[0].pTo2.value;
                        pInterID  = result_object_from.results.bindings[0].pathNextToID.value;
                        pInterPath[count] = result_object_from.results.bindings[0].pTo.value;
                        //alert(result_object_from.results.bindings[0].pTo.value);
                        count++;
                        pInterPathStringFrom = pInterPath[0];
                        for(var j = 1; j<count-1; j++)
                        {
                                pInterPathStringFrom = pInterPathStringFrom + "-" + pInterPath[j];
                        }//END OF FOR LOOP
                }//END OF ELSE
            } //END OF WHILE		
            jsonString  = jsonString + "[\""+hours+":"+mins+"\", \""+(parseInt(hours, 10) + duration[1])+":00\", \""+pTo+"\", \""+pInterPathStringTo+"\", \""+pTo+"\", \""+pInterPathStringFrom+"\"],";
        } //END OF IF
        else 
        {
            //alert("It did equal 1!");
            jsonString  = jsonString + "[\"\", \"\", \"\", \"\", \"\", \"\"],";

        } //END OF ELSE
        
        currentDay++;
        if(currentDay > daysInMonth)
        {
            currentDay = 1;
            currentMonth++;
        }

        
    } //END OF FOOR LOOP (7 DAYS)

    jsonString = "{\"data\": ["+jsonString+"]}";
    
    var d = new Date();
    log_data = log_data + d.getTime() + jsonString;
    
    var jsonObject = eval("(" + jsonString + ")");
    //console.log (jsonObject);
    //alert(jsonObject.data[0][0]);

    return jsonObject;

}//END OF FUNCTION


/////////////////////////////////

function parseDayScheduleJson(jsonObj) 
{
    set_start_date();
    overwrite = testDates("OfficeWork"); //Overwrite is used to test the next values as well (lunch breaks, etc.)
    
    if(overwrite){//Check to see if these activites exists already in the ontology.
		
        var sTime, eTime, entrance, enPath, exit, exPath, duration = undefined;
//        var date = $( "#datepicker" ).datepicker('getDate');
        for(var i = 0; i<jsonObj.length; i++)
        {

//            console.log(currentDay);
            //Start time is taken from jsonobject returned from Handsontable
            sTime = jsonObj[i][0];
           
            if(sTime!==null)
            {

                //Assumes only hourly changes. Takes first two digits, i.e. 09:00 = 09
//                
                //Check to make sure a value like 9:00 has not been entered (this must be reconsidered, currently assume zero is always present).
                //if(parseInt(hours, 10)<10){sTime = "0" + sTime;}
                //alert(sTime);
                //Extract minutes (currently not used)

                //Create a date from times as a unique id and to also be used for calculating durations
                //IMPORTANT, you muyst use the jQuery to avoid passing date by reference (e.g. using storeDate);
                var date = $( "#datepicker" ).datepicker('getDate');
                date.setHours(sTime.substring(0, 2));
//                console.log(date.getHours());
//                console.log(date.getYear);
                eTime = jsonObj[i][1];
//                console.log(date.getYear());
                var date2 = $( "#datepicker" ).datepicker('getDate');
                date2.setHours(eTime.substring(0, 2));
//                console.log(date2.getHours());
//                Calculater duration from dates.
//                console.log(date.getTime());
//                console.log(currentYear+"-"+currentMonth+"-"+ currentYear + "T" + sTime +":00Z");
//                console.log(date2.getTime());
//                console.log(currentYear+"-"+currentMonth+"-"+ currentYear +  "T" + eTime +":00Z");
                duration = date2 - date;
//
//                console.log(duration);
                //Determing the path using the symbolic paths
                entrance = jsonObj[i][2];
                enPath = jsonObj[i][3];
                exit = jsonObj[i][4];
                exPath = jsonObj[i][5];
//                alert(entrance + " : " + enPath + " : " + officeName);
                var pathTo = checkPathFrom(entrance, enPath, officeName); //bobbb
                var pathFrom = checkPathTo(officeName, exPath, exit);
                //alert(queryDate);
                //Must fix start day by converting to integer to add "i"
                set_current_date();
                var query = "";
                query = "DELETE WHERE{"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?userID."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> ?queryDate."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> ?room."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo> ?pathTo."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom> ?pathFrom."+
                    "}" 
                //alert(query);
                sparql_delete (query);
                query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeActivity"+userID+"-"+queryDate+">"+
                        "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeWork>; "+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \"" + userID +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> \"" + officeName +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \"" + queryDate +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> \"" + sTime + ":00\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> \""+ duration + "\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+pathTo+">;"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+pathFrom+">;}";

                console.log(query);
                if(sTime!=="")
                {
                   sparql_update (query);
                }
                //alert(result_object);
            } //End of if sTime!=null
            
            currentDay++;
            if(currentDay > daysInMonth)
            {
                currentDay = 1;
                currentMonth++;
            }
        }
    }

       

}

///////////////////////////////
//
//
//
// BREAKS
//
//
//
////
function queryBreaks(current){
    
    current = parseInt(current);
//    var d = new Date();
//    log_data = log_data + d.getTime()  + "queryBreaks\n";
    parseInt(current);
    set_start_date();

    var jsonString = "";


    currentDay = currentDay +current;

    for(var  y=0; y<iActivities.length ; y++)
    {
        set_current_date();
        var query = "SELECT ?guid ?duration ?activity ?frequency ?pathNextToID ?pathNextFromID ?pTo ?pFrom "+
            "WHERE{"+
            "?break  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#IntermediateActivity>;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+userID+"\"."+
            "?break  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#IntermediateActivity>;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasIntermediateActivityType> \""+iActivities[y]+"\"."+
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+queryDate +"\"."+ 
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?guid."+
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasFrequency> ?frequency."+
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasIntermediateActivityType> ?activity."+ 
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo>  ?pathTo."+
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom>  ?pathFrom."+
            "?pathTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
            "?pathTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
            "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
            "?pathFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementFrom."+
            "?pathFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextFrom."+
            "?pathNextFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextFromID."+
            "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
            "?placementFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pFrom." +
            "}";
        console.log(query);

        var result_object = sparql_query (query);

        //alert(JSON.stringify(result_object));
        // get each binding (data point entry object) and append it to a "series" array
        var duration, frequency, activityType;

        if(result_object.results.bindings.length!==0)
        {

            duration = result_object.results.bindings[0].duration.value;

            frequency = result_object.results.bindings[0].frequency.value;
            activityType = result_object.results.bindings[0].activity.value;

            var pTo = result_object.results.bindings[0].pTo.value;
            var pFrom = result_object.results.bindings[0].pFrom.value;

            var pInterID = result_object.results.bindings[0].pathNextToID.value;
            var pInterPath = new Array();

            var pInterPathStringTo;


            var count = 0;
            var bool = true;

            while(bool)
            {

                //alert("Count" + count + " ID: " +pInterID);
                var query = "SELECT ?pathNextToID ?pTo "+
                    "WHERE{"+
                    "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+pInterID+"\"."+
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
                    "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
                    "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
                    "}";

                //alert(query);
                var result_object_to = sparql_query (query);
                //alert(JSON.stringify(result_object));

                if(result_object_to.results.bindings==="")
                {
                        bool = false;
                }
                else if(pInterID==="pathEnd")
                {
                        bool = false;
                        //alert("Test");
                        //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
                        //	alert("Working");
                        //}
                }//END OF IF
                else{	

                    //Return the ID for the next query		
                    pInterID  = result_object_to.results.bindings[0].pathNextToID.value;

                    //Return the pTo symbolic value
                    pInterPath[count] = result_object_to.results.bindings[0].pTo.value;
                    //Increase the count by one
                    count++;
                    //Set the fist value of the string as the value at position 0 of the array of symbolic points
                    pInterPathStringTo = pInterPath[0];
                    //alert("Test"+pInterPathStringTo);
                    //If the array is greater than 1 then 
                    for(var j = 1; j<count-1; j++){
                        //alert("Test2" + pInterPath[j]);
                        pInterPathStringTo = pInterPathStringTo + "-" + pInterPath[j];

                    }

                }

            }


            pInterID = result_object.results.bindings[0].pathNextFromID.value;
            pInterPath = new Array();
            var pInterPathStringFrom;
            if(pFrom===pTo)
            {

                pInterPathStringFrom = "No Path";
                pInterPathStringTo = "No Path";

            }
            bool = true;
            count = 0;

            while(bool)
            { //WHILE LOOP KEEPS GOING UNTIL IT REACHES THE END PATH NODE

                var query = "SELECT ?pathNextToID ?pTo "+
                    "WHERE{"+
                    "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+pInterID+"\"."+
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
                    "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
                    "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
                    "}";

                var result_object_from = sparql_query (query);

                if(result_object_from.results.bindings==="")
                {

                    bool = false;

                }//END OF IF 
                else if(pInterID==="pathEnd")
                {
                        bool = false;
                        //alert("Test");
                        //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
                        //	alert("Working");
                        //}
                }//END OF IF
                else
                {			

                    pInterID  = result_object_from.results.bindings[0].pathNextToID.value;
                    pInterPath[count] = result_object_from.results.bindings[0].pTo.value;
                    count++;
                    pInterPathStringFrom = pInterPath[0];
                    for(var j = 1; j<count-1; j++)
                    {
                            pInterPathStringFrom = pInterPathStringFrom + "-" + pInterPath[j];
                    }		
                }//END OF ELSE

            }//END OF WHILE (THERE IS STILL A NEXT PATH)

                jsonString  = jsonString + "[\""+iActivities[y]+"\", \""+frequency+"\", \""+duration+"\", \""+pFrom+"\", \""+pInterPathStringTo+"\",\""+pInterPathStringFrom+"\"],";

        } 
        else {

            if(y!==0){
                jsonString  = jsonString + "[\"\", \"\", \"\", \"\", \"\",\"\"],";
            }
        }//END OF ELSE

    } //END OF FOR LOOP THROUGH ACTIVITIES FOR THAT DAY

    //CREATE AN ARRAY TO STORE THE 7 DAYS OF BREAKS

    jsonString = "{\"data\": ["+jsonString+"]}";
    var d = new Date();
    log_data = log_data + d.getTime() + jsonString;

    var jsonObject = eval("(" + jsonString + ")");


    return jsonObject;
    //return jsonObject;

}//END OF FUNCTION

function parseBreaksJson(jsonObj, addDay) 
{
    addDay = parseInt(addDay);
//    var d = new Date();
//    log_data = log_data + d.getTime()  + "parseBreaksJson\n";
    console.log(addDay);
    set_start_date();
    console.log(overwrite);
//    if(overwrite === false)
//    {
        overwrite = testBreaksDates(addDay);
//    }

    if(overwrite === true)
    {

        var type, frequency, duration, destination, path, returnPath = undefined;

        for(var i = 0; i<jsonObj.length; i++)
        {

            //Extract activity type from jsonobject returned from Handsontable
            type = jsonObj[i][0];
            //Extract frequency
            frequency = jsonObj[i][1];
            //Extract duration
            duration = jsonObj[i][2];
            destination = jsonObj[i][3];
            path = jsonObj[i][4];
            returnPath = jsonObj[i][5];


            var pathTo = checkPathTo(officeName, path, destination); 
            
            var pathFrom = checkPathFrom(destination, returnPath, officeName);

            //checkAndDelete("IntermediateActivity", queryDate, userID ,type);
            //Must fix start day by converting to integer to add "i"
            currentDay = currentDay+addDay;
            set_current_date();
            query = "DELETE WHERE{"+
                 "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#IntermediateActivity"+userID+type+queryDate+">"+
                 "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?userID."+
                 "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#IntermediateActivity"+userID+type+queryDate+">"+
                 "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?queryDate."+
                 "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#IntermediateActivity"+userID+type+queryDate+">"+
                 "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasFrequency> ?startTime."+
                 "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#IntermediateActivity"+userID+type+queryDate+">"+
                 "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
                 "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#IntermediateActivity"+userID+type+queryDate+">"+
                 "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasIntermediateActivityType> ?pathTo."+
                 "}" 
            console.log(query);     
            sparql_delete (query);
            var query = "";
            query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#IntermediateActivity"+userID+type+queryDate+">"+
                "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#IntermediateActivity>; "+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \"" + userID +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"" + userID + "-"+type+"-"+queryDate+"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasIntermediateActivityType> \"" + type +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasFrequency> \"" + frequency +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \"" + queryDate +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> \""+ duration + "\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+pathTo+">;"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+pathFrom+">;}";
		
            console.log(query);
            if(type!=="")
            {
                sparql_update (query);
            }
            //alert(result_object);
        } //END OF FOR
        
    } //END OF IF

    //console.log (jsonObj); // print it out series to console for checking

}

//These methods are a short time fix and need to be integrated with webGL tool for creation of paths in ontology!!!
function checkPathTo(start, path, end){
    
//    var d = new Date();
//    log_data = log_data + d.getTime()  + "checkPathTo\n";
    //NEW WAY OF DOING THIS
    if((start==="R02")&&(path==="P3-P2")&&(end==="P1")){

        return "PathStartR2P3P2P1";
        
    }
    else if((start==="R02")&&(path==="P4-P2")&&(end==="P1")){

        return "PathStartR2P4P2P1";
        
    }
    else if((start==="R02")&&(path==="P3")&&(end==="P5")){

        return "PathStartR2P3P5";
        
    }    
    else if((start==="R02")&&(path==="P4")&&(end==="P5")){

        return "PathStartR2P4P5";
        
    }
    else if((start==="R02")&&(path==="P3")&&(end==="P6")){

        return "PathStartR2P3P6";
        
    }

    else if((start==="R02")&&(path==="P4")&&(end==="P6")){

        return "PathStartR2P4P6";
        
    }
    else if((start==="R02")&&(path==="P3")&&(end==="R36")){

        return "PathStartR2P3R36";
        
    }
    else if((start==="R02")&&(path==="P4")&&(end==="R36")){

        return "PathStartR2P4R36";
        
    }
    
    else if((start==="R02")&&(path==="No Path")&&(end==="R36")){

        return "PathStartR2";
        
    }
    else if((start==="R02")&&(path==="No Path")&&(end==="R07")){

        return "PathStartR2";
        
    }
    else if((start==="R02")&&(path==="No Path")&&(end==="R02")){

        return "PathStartR2";
        
    }
    else if((start==="R02")&&(path==="P3")&&(end==="R13")){

        return "PathStartR13P3R2";
        
    }
    else if((start==="R02")&&(path==="P4")&&(end==="R13")){

        return "PathStartR13P4R2";
        
    }
}
function checkPathFrom(start, path, end){


    if((start==="P1")&&(path==="P2-P3")&&(end==="R02")){

        return "PathStartP1P2P3R2";
        
    }
    else if((start==="P1")&&(path==="P2-P4")&&(end==="R02")){

        return "PathStartP1P2P4R2";
        
    }
    else if((start==="P5")&&(path==="P3")&&(end==="R02")){

        return "PathStartP5P3R2";
        
    }
    else if((start==="P5")&&(path==="P4")&&(end==="R02")){

        return "PathStartP5P4R2";
        
    }
    else if((start==="P6")&&(path==="P3")&&(end==="R02")){

        return "PathStartP6P3R2";
        
    }
    else if((start==="P6")&&(path==="P4")&&(end==="R02")){

        return "PathStartP6P4R2";
        
    }
    else if((start==="R36")&&(path==="P3")&&(end==="R02")){

        return "PathStartR36P3R2";
        
    }
    else if((start==="R36")&&(path==="P4")&&(end==="R02")){

        return "PathStartR36P4R2";
        
    }
    
    else if((start==="R36")&&(path==="No Path")&&(end==="R02")){

        return "PathStartR2";
        
    }
    else if((start==="R07")&&(path==="No Path")&&(end==="R02")){

        return "PathStartR2";
        
    }
    else if((start==="R02")&&(path==="No Path")&&(end==="R02")){

        return "PathStartR2";
        
    }
    else if((start==="R13")&&(path==="P3")&&(end==="R02")){

        return "PathStartR13P3R2";
        
    }
    else if((start==="R13")&&(path==="P4")&&(end==="R02")){

        return "PathStartR13P4R2";
        
    }
}
// show jquery forms and energy data for room 001
function parseLunchBreaksJson(jsonObj) {

	for(var i = 0; i<jsonObj.length; i++){

		var query = "";
		for(var j = 0; j<jsonObj[i].length; j++){

			//alert(jsonObj[i][j]);
			query = query + jsonObj[i][j] + " :: ";
		}

		alert(query);
		//sparql_query (query);

	}

}

// show jquery forms and energy data for room 001
function parseOtherBreaks(date, jsonObj) {

	for(var i = 0; i<jsonObj.length; i++){

		var query = "";
		for(var j = 0; j<jsonObj[i].length; j++){

			//alert(jsonObj[i][j]);
			query = query + jsonObj[i][j] + " :: ";
		}

		alert(query);
		//sparql_query (query);

	}

}

//});