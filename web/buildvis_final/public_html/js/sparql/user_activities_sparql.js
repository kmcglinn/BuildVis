// * Javascript name: user_activities_sparql
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


var activities_overwrite = true;

var userID, officeName, roomName;
var queryDate, currentDate, storeDate, currentDay, currentMonth, currentYear, startDay, daysInMonth;




/*
 * This function checks to see if acitivites exist already 
 * for a particular activity day (and prompts users in case they are about to overwrite 
 * @param {type} activityName
 * @returns {Boolean}
 */
function testDates(activityName){

    var arrayDay = new Array();
    var count = 0;
    set_current_date();
    for(var i = 0; i<7;i++)
    {

        var query = "SELECT ?officeWork "+
            "WHERE{"+
            "?officeWork  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity>;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+userID+"\"."+
            "?officeWork  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityType> \""+activityName +"\"."+
            "?officeWork  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+queryDate +"\"."+
            "}";
//        console.log(query);
        var result_object = sparql_query (query);

        if(result_object.results.bindings!=="")
        {
            
            arrayDay[count] = currentYear +"-"+currentMonth+"-"+convertDayInt(currentDay+i);
            count++;
            
        }	//END OF IF

    }//END OF FOR LOOP


    var arrayDayString = arrayDay[0];
    for(var i = 1; i<count;i++)
    {
            arrayDayString = arrayDayString + ", " + arrayDay[i];
    }//END OF FOR LOOP
    
    if(arrayDayString!==undefined)
    {
        
        var r=confirm("Warning, you may have already entered activities for this activity: " + activityName + " for these dates: " + arrayDayString + ". Do you wish to overwrite your previous entries?");
        if (r===true)
        {
            activities_overwrite=true;        
//            deleteActivities(queryDate, userID);
        }//END OF IF
        else
        {
            activities_overwrite=false;
        }//END OF ELSE

    }//END OF IF

    return activities_overwrite;
    
}//END OF FUNCTION

/*
 * QUERY ACTIVITY - This Function queries the ontology for all lunch breaks (start time, duration, path to and from)
 * @param {type} jsonObj
 * @returns {unresolved}
 */
function queryActivities(jsonObj, activityType){
    
//    console.log(activityType);
    set_start_date();
    parse_ID_Json(jsonObj);

    var jsonString = "";

    for(var i=0; i<7;i++)
    {
        set_current_date();
        var query = "SELECT ?duration ?startTime ?roomNumber "+
            "WHERE{"+
            "?activity  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity>;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+userID+"\"."+
            "?activity  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityType> \""+activityType +"\"."+
            "?activity  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+queryDate +"\"."+
            "?activity  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
            "?activity  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
            "?activity  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> ?roomNumber."+
            "}";
        console.log(query);
        var result_object = sparql_query (query);
//	console.log(JSON.stringify(result_object));
        // get each binding (data point entry object) and append it to a "series" array
        var duration, start, roomNumber;
        if(result_object.results.bindings.length!==0)
        {
            //Get Duration of Activity
            duration = result_object.results.bindings[0].duration.value;
            
            //Get Room Number
            roomNumber = result_object.results.bindings[0].roomNumber.value;
            //Convert duration to array [Day, Hour, Minutes, Seconds]
            var duration_array = convertMS(duration);	           
            //Get start time
            start = result_object.results.bindings[0].startTime.value;
            
            //This needs to be fixed up!
            
            //Convert hours in by parsing string
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

            jsonString  = jsonString + "[\""+startHours+":"+startMins+"\", \""+(parseInt(endHours, 10))+":"+endMins+"\", \""+roomNumber+"\"],";

        } 
        else 
        {

              jsonString = jsonString + "[\"\", \"\", \"\"],";

        }
        currentDay++;
        //CAUTION: Need to check this is correctly updating the number of years!!!
        
        if(currentDay > daysInMonth)
        {
            currentDay = 1;
            currentMonth++;
        }
    }

    jsonString = "{\"data\": ["+jsonString+"]}";
    console.log(jsonString);

    var jsonObject = eval("(" + jsonString + ")");

    return jsonObject;

} //END OF FUNCTION

/*
 * 
 * UPDATE ACTIVITIES - This Function queries the ontology for day begining and start times (start time, duration, path to and from)
 * 
 */

function parseActivityJson(jsonObj, activityType) {
    

    set_start_date();
    
//    if(activities_overwrite === false)
//    {
//        activities_overwrite = testDates(activityType);
//    }
//
//    if(activities_overwrite === true)
//    {

        var sTime, eTime, location, duration = undefined;

        for(var i = 0; i<jsonObj.length; i++)
        {
          
            
            sTime = jsonObj[i][0];
            if(sTime.length===0)
            {
                console.log('Empty string is allowed?');              
            }
            else if(sTime.length===4)
            {
                sTime='0'+sTime; console.log('Catching string entry of incorrect length');
            }//cath entires that are not in form 09
            else if(sTime.length!==5)
            {
                alert('You must enter in time in the following format "09:00"');
            }//catch all other bad format.    
            location = jsonObj[i][2];

            if(sTime!==null)
            {
                ////Start time is taken from jsonobject returned from Handsontable
                //Calculate DURATION
                var date = $( "#datepicker" ).datepicker('getDate');
                date.setHours(sTime.substring(0, 2));
                date.setMinutes(sTime.substring(3, 5));

                eTime = jsonObj[i][1];
                if(sTime.length===0)
                {
                    console.log('Empty string is allowed?');              
                }
                else if(eTime.length===4)
                {
                    eTime='0'+eTime; console.log('Catching string entry of 1 length');
                }//cath entires that are not in form 09
                else if(eTime.length!==5)
                {
                    alert('You must enter in time in the following format "17:00"');
                }   
                
                var date2 = $( "#datepicker" ).datepicker('getDate');
                date2.setHours(eTime.substring(0, 2));
                date2.setMinutes(eTime.substring(3, 5));

                duration = date2 - date;

                set_current_date();
                //Must fix start day by converting to integer to add "i"
                query = "DELETE WHERE{"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+activityType+"-"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?userID."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+activityType+"-"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityType> ?activityType."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+activityType+"-"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> ?officeNumber."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+activityType+"-"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> ?queryDate."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+activityType+"-"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+activityType+"-"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
                    "}" 
                
                sparql_delete (query);
                var query = "";

                query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+activityType+"-"+userID+"-"+queryDate+">"+
                        "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity>; "+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityType> \"" + activityType +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \"" + userID +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \"" + queryDate +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> \"" + sTime + ":00\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> \""+ duration + "\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> \""+ location + "\";"+
                        "}";
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
//    }
    
	//console.log (jsonObj); // print it out series to console for checking

}


/*
 * 
 * @param {type} date
 * @param {type} jsonObj
 * @returns {undefined}
 */
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

/*
 * Query Meetings. Meetings have an order assigned them as there can be 0-* occurences and therefore need their own query
 * @param {type} current
 * @returns {unresolved}
 */
function queryMeetings(current, activityType){

    console.log('SPARQL::Query meetings');
    current = parseInt(current);
//    var d = new Date();
//    log_data = log_data + d.getTime()  + "queryBreaks\n";
//    alert(current);
    set_start_date();

    var jsonString = "";

    
    currentDay = currentDay + current;
    set_current_date(); //This must be called after the currentDay is set!!!
    var order = 0;
    for(var y=0; y<7; y++)
    {

        var query = "SELECT ?startTime ?activity ?duration ?order ?roomNumber ?pathNextToID ?pathNextFromID ?pTo ?pFrom "+
            "WHERE{"+
            "?break  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity>;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+userID+"\"."+
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityType> \""+activityType +"\"."+         
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+queryDate +"\"."+ 
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasOrder> \""+order +"\"."+ 
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> ?roomNumber."+
            "}";
        console.log(query);
        
        var result_object = sparql_query (query);

        // get each binding (data point entry object) and append it to a "series" array
        var duration, start, order, roomNumber;

        if(result_object.results.bindings.length!==0)
        {
               
            duration = result_object.results.bindings[0].duration.value;
            roomNumber = result_object.results.bindings[0].roomNumber.value;
            var duration_array = convertMS(duration);	
            start = result_object.results.bindings[0].startTime.value;
                
            //Needs to be fixed up!
            var startHours = start.substring(0, 2);
            var endHours = parseInt(start.substring(0, 2))+duration_array[1];
            if(endHours<10)
            {
                endHours = "0"+endHours;
            }
            var startMins = start.substring(3,5)
            var endMins = parseInt(start.substring(3,5));

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

                jsonString  = jsonString + "[\""+startHours+":"+startMins+"\", \""+endHours+":"+endMins+"\", \""+roomNumber+"\"],";
                order++;
                
        } 
        else {

            if(y!==0){
                
                jsonString  = jsonString + "[\"\", \"\", \"\"],";
                
            }
        }//END OF ELSE

    }  //END OF FOR LOOP THROUGH ALL MEETINGS FOR THAT DAY

    //CREATE AN ARRAY TO STORE THE MEETINGS
    jsonString = "{\"data\": ["+jsonString+"]}";

    var jsonObject = eval("(" + jsonString + ")");
    console.log(jsonString);

    return jsonObject;
    //return jsonObject;

}//END OF FUNCTION

function parseMeetingsJson(jsonObj, addDay, activityType) 
{
    

    set_start_date();
 
    currentDay = currentDay+addDay; //add the selected day to the current date


//    if(activities_overwrite === false)
//    {
//        activities_overwrite = testDates(activityType); 
//    }
//
//
//    if(activities_overwrite === true)
//    {

        count = 0;
        for(var i = 0; i<jsonObj.length; i++)
        {

            if(jsonObj[i][0]!=="")
            {
                var sTime, eTime, duration, exit, enPath, exPath = undefined, count;

                sTime = jsonObj[i][0];

                if(sTime!==null)
                {//Start time is taken from jsonobject returned from Handsontable
                    //Calculate DURATION
                    var date = $( "#datepicker" ).datepicker('getDate');
                    date.setHours(sTime.substring(0, 2));
                    date.setMinutes(sTime.substring(3, 5));

                    eTime = jsonObj[i][1];

                    var date2 = $( "#datepicker" ).datepicker('getDate');

                    date2.setHours(eTime.substring(0, 2));
                    date2.setMinutes(eTime.substring(3, 5));

                    duration = date2 - date;

                    exit = jsonObj[i][2]; //Indicates destination (where lunch takes place)
                    enPath = jsonObj[i][3]; //Indicates path taken (to location of lunch)
                    exPath = jsonObj[i][4]; //Indicates path returned (from of lunch to work place/office)
                    
                    set_current_date();

                    query = "DELETE WHERE{"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+count+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?userID."+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+count+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityType> ?activityType."+                           
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+count+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> ?queryDate."+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+count+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+count+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+count+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasOrder> ?order."+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+count+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> ?officeName."+ 
                            "}" 
                        "}" 
//                    console.log(query);  
//                    alert(query);
                    sparql_delete (query);
                    var query = "";
                    query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+count+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                        "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity>; "+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityType> \"" + activityType +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \"" + userID +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \"" + queryDate +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> \"" + sTime + ":00\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> \""+ duration + "\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasOrder> \""+ count + "\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> \""+ exit + "\";"+

                        "}";	
//                    console.log(query);
                    if(duration!=="NaN"||duration!=="0")
                    {
                        sparql_update (query);
                    }
                    else 
                        {
                            console.log("Problem with meetings INSERT duration - " + duration);
                        }

                    count++;
                    
                } //END OF FOR
            }//End IF (checking json row is not empty)
            else
            {
                set_current_date();
                query = "DELETE WHERE{"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+currentDay+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?userID."+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+currentDay+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityType> ?activityType."+                           
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+currentDay+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> ?queryDate."+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+currentDay+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+currentDay+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+currentDay+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasOrder> ?order."+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity"+currentDay+"-"+activityType+"-"+userID+"-"+queryDate+">"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> ?officeName."+ 
                        "}" 
                    "}" 
                console.log(query);
                sparql_delete (query);
//                    alert(query);
                count++;
            }
                
        } //END OF IF
//    }


}

function set_start_date()
{
    
    var date = $( "#datepicker" ).datepicker('getDate');
    currentDay = date.getDate();
    currentMonth = date.getMonth()+1;
    currentYear = date.getFullYear();
    daysInMonth = days_In_Month(currentMonth, currentYear);
    queryDate = currentYear + "-" + currentMonth + "-" + currentDay;    
    
}

function set_current_date()
{
    
    queryDate = currentDay + "-" + currentMonth + "-" + currentYear;  
    
}
function days_In_Month(month,year) {
    
    return new Date(year, month, 0).getDate();
    
}

function parse_ID_Json(jsonObj) 
{

    userID = jsonObj[0][0];
//    roomName = jsonObj[1][0];
//    officeName = jsonObj[1][0];

}


/*
 * LEGACY FUNCTIONS???
 */
function checkAndDelete(activityType, queryDate, userID, type){
    
    var query = "SELECT ?activityType "+
        "WHERE{"+
        "?activityType  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+activityType+">;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+userID+"\"."+
        "?activityType  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+queryDate +"\"."+
        "?activityType  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasIntermediateActivityType> \""+ type +"\"."+
        "}";

    var result_object = sparql_query (query);
    console.log(query);
    if(result_object.results.bindings!="")
    {
        alert("This activity exists!");
    }
    
}

/*
 * 
 * @param {type} addDay
 * @returns {Boolean}
 */

function testBreaksDates(addDay){

    var arrayActivity = new Array();
    var count = 0;
    set_start_date(); //RESETTING DATE
    
    console.log("activityDay: "+addDay);
    currentDay = currentDay+addDay;
    set_current_date(); //SETTING THE CURRENT WORKING DAY
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


    var arrayDayString = arrayActivity[0];
    for(var i = 1; i<count;i++)
    {
            arrayDayString = arrayDayString + ", " + arrayActivity[i];
    }//END OF FOR LOOP
    if(arrayDayString!==undefined){
        //alert("Warning, you have already entered activites for the following dates: " + arrayDayString);	
        var r=confirm("Warning, you have already entered activities for intermediate activity types: " + arrayActivity + " on this date: " + queryDate + ". Do you wish to activities_overwrite your previous entries?");
        if (r===true)
        {
            activities_overwrite=true;        
            deleteIntermediateActivities(queryDate, userID);
        }//END OF IF
        else
        {
            activities_overwrite=false;
        }//END OF ELSE

    }//END OF IF

    return activities_overwrite;
    
}//END OF FUNCTION

///*
// * For some reason I need to include this funciton here (having it included at the beginning of the page doesn't always work...
// * 
// */
//
//function convertDayInt(d)
//{
//
//    var stringDay;
//    if(d<10)
//            {stringDay = "0"+(d);}
//    else 
//            {stringDay = (d);}
//
//    //alert(stringDay);
//    return stringDay;
//
//}