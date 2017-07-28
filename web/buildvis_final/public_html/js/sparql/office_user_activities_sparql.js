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

var activities_overwrite = true;

var userID, officeName, roomName;
var queryDate, currentDate, storeDate, currentDay, currentMonth, currentYear, startDay, daysInMonth;


/*
 * This function check sto see if acitivites exist already for a particular activity day (and prompts users in case they are about to overwrite 
 *
 */

function testDates(activityName){

    var arrayDay = new Array();
    var count = 0;
    set_current_date();
    for(var i = 0; i<7;i++)
    {

        var query = "SELECT ?officeWork "+
            "WHERE{"+
            "?officeWork  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Activity>;"+
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
    parse_ID_Json(jsonObj);

    var jsonString = "";

    for(var i=0; i<7;i++)
    {
        set_current_date();
        var query = "SELECT ?duration ?startTime ?roomNumber ?pathNextToID ?pathNextFromID ?pTo ?pFrom "+
            "WHERE{"+
            "?lunchBreak  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Lunch>;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+userID+"\"."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+queryDate +"\"."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> ?roomNumber."+
//            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo>  ?pathTo."+
//            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom>  ?pathFrom."+
//            "?pathTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
//            "?pathTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
//            "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
//            "?pathFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementFrom."+
//            "?pathFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextFrom."+
//            "?pathNextFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextFromID."+
//            "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
//            "?placementFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pFrom." +
            "}";
        console.log(query);
        var result_object = sparql_query (query);
		
//        console.log(JSON.stringify(result_object));

        // get each binding (data point entry object) and append it to a "series" array
        var duration, start, roomNumber;
        
        if(result_object.results.bindings.length!==0)
        {
            duration = result_object.results.bindings[0].duration.value;
            roomNumber = result_object.results.bindings[0].roomNumber.value;
//            console.log("Duration: " + duration);
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
//            var pFrom = result_object.results.bindings[0].pFrom.value;
//            //alert(pFrom);
//            //alert(result_object.results.bindings[0].pathNextToID.value);
//            var pInterID = result_object.results.bindings[0].pathNextToID.value;
//            var pInterPath = new Array();
//            var pInterPathStringTo;
//            var count = 0;
//            var bool = true;
//            
//            while(bool)
//            {
//                var query = "SELECT ?pathNextToID ?pTo "+
//                    "WHERE{"+
//                    "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+pInterID+"\"."+
//                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
//                    "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
//                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
//                    "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
//                    "}";
//
//                //alert(JSON.stringify(query));
//                var result_object_to = sparql_query (query);
//                //alert(JSON.stringify(result_object));
//
//                if(result_object_to.results.bindings==="")
//                {
//                    bool = false;
//                } //END OF IF
//                else if(pInterID==="pathEnd")
//                {
//                        bool = false;
//                        //alert("Test");
//                        //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
//                        //	alert("Working");
//                        //}
//                }//END OF IF
//                else
//                {	
//                    //Return the ID for the next query		
//                    pInterID  = result_object_to.results.bindings[0].pathNextToID.value;
//                    //alert("ID of Next"+pInterID);
//                    //Return the pTo symbolic value
//                    pInterPath[count] = result_object_to.results.bindings[0].pTo.value;
//                    //Increase the count by one
//                    count++;
//                    //Set the fist value of the string as the value at position 0 of the array of symbolic points
//                    pInterPathStringTo = pInterPath[0];
//                    //alert("Test"+pInterPathStringTo);
//                    //If the array is greater than 1 then 
//                    for(var j = 1; j<count-1; j++){
//                        //alert("Test2" + pInterPath[j]);
//                        pInterPathStringTo = pInterPathStringTo + "-" + pInterPath[j];
//
//                    } //END OF FOOR LOOP
//                }//END OF ELSE
//                    //alert("Count" + count + ":"+pInterPathStringTo);	
//            } //END OF WHILE
//                //alert("Final Count" + count + ":"+pInterPathStringTo);
//            pInterID = result_object.results.bindings[0].pathNextFromID.value;
//            pInterPath = new Array();
//            var pInterPathStringFrom;
//            bool = true;
//            count = 0;
//
//            while(bool)
//            {
//                var query = "SELECT ?pathNextToID ?pTo "+
//                    "WHERE{"+
//                    "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+pInterID+"\"."+
//                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
//                    "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
//                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
//                    "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
//                    "}";
//
//                var result_object_from = sparql_query (query);
//
//                //alert(result_object_from.results.bindings[0].pathNextToID.value);
//
//                //console.log(result_object.results.bindings);
//                if(result_object_from.results.bindings==="")
//                {
//
//                }
//                else if(pInterID==="pathEnd")
//                {
//                        bool = false;
//                        //alert("Test");
//                        //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
//                        //	alert("Working");
//                        //}
//                }//END OF IF
//                else
//                {			
//                    //result_object_from.results.bindings[0].pTo2.value;
//                    pInterID  = result_object_from.results.bindings[0].pathNextToID.value;
//                    pInterPath[count] = result_object_from.results.bindings[0].pTo.value;
//                    //alert(result_object_from.results.bindings[0].pTo.value);
//                    count++;
//                    pInterPathStringFrom = pInterPath[0];
//                    for(var j = 1; j<count-1; j++)
//                    {
//                            pInterPathStringFrom = pInterPathStringFrom + "-" + pInterPath[j];
//                    }//END OF FOR LOOP
//                }//END OF ELSE
//            }//END OF WHILE
////	    console.log(parseInt(endHours, 10));
//            if(current_building===1){
//            if(pFrom==="P1")
//            {
//                pInterPathStringTo="P2";
//                pInterPathStringFrom="P2";
//            }
//            else
//            {
//                pInterPathStringTo=no_path_text;
//                pInterPathStringFrom=no_path_text;
//            }
//            }
//            jsonString  = jsonString + "[\""+startHours+":"+startMins+"\", \""+(parseInt(endHours, 10))+":"+endMins+"\", \""+pFrom+"\", \""+pInterPathStringTo+"\",\""+pInterPathStringFrom+"\"],";
            jsonString  = jsonString + "[\""+startHours+":"+startMins+"\", \""+(parseInt(endHours, 10))+":"+endMins+"\", \""+roomNumber+"\"],";

        } 
        else 
        {
            //alert("It did equal 1!");
//            jsonString  = jsonString + "[\"\", \"\", \"\", \"\", \"\"],";
              jsonString = jsonString + "[\"\", \"\", \"\"],";

        }
        currentDay++;
        if(currentDay > daysInMonth)
        {
            currentDay = 1;
            currentMonth++;
        }
    }

    jsonString = "{\"data\": ["+jsonString+"]}";
    console.log(jsonString);
//    var d = new Date();
//    log_data = log_data + d.getTime() + jsonString;


    var jsonObject = eval("(" + jsonString + ")");
//    console.log (jsonString);

    return jsonObject;

} //END OF FUNCTION

/*
 * 
 * UPDATE LUNCH BREAKS - This Function queries the ontology for day begining and start times (start time, duration, path to and from)
 * 
 */

function parseLunchScheduleJson(jsonObj) {
    

    set_start_date();
    
    if(activities_overwrite === false)
    {
        activities_overwrite = testDates("Lunch");
    }

    if(activities_overwrite === true)
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
//                console.log(exit + " : " + enPath + " : " + officeName);
                var pathTo = checkPathTo(officeName, enPath, exit); //bobbb
                var pathFrom = checkPathFrom(exit, exPath, officeName);
                set_current_date();
                //Must fix start day by converting to integer to add "i"
                query = "DELETE WHERE{"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?userID."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> ?officeNumber."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> ?queryDate."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
//                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
//                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo> ?pathTo."+
//                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
//                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom> ?pathFrom."+
                    "}" ;
                
                sparql_delete (query);
                var query = "";

                query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LunchActivity"+userID+"-"+queryDate+">"+
                        "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Lunch>; "+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \"" + userID +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \"" + queryDate +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> \"" + sTime + ":00\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> \""+ duration + "\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> \""+ exit + "\";"+
//                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+pathTo+">;"+
//                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+pathFrom+">;
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
    }
    
	//console.log (jsonObj); // print it out series to console for checking

}
/*
 * DAY START END this function queries all office work activities. 
 * @param {type} jsonObj
 * @returns {unresolved}
 */

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
            "?officeWork  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> \""+officeName +"\"."+
            "?officeWork  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
            "?officeWork  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+

//            "?officeWork  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo>  ?pathTo."+
//            "?officeWork  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom>  ?pathFrom."+
//            "?pathTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
//            "?pathTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
//            "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
//            "?pathFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementFrom."+
//            "?pathFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextFrom."+
//            "?pathNextFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextFromID."+
//            "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
//            "?placementFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pFrom." +
            "}";
        console.log(query);
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
//            var pTo = result_object.results.bindings[0].pTo.value;

//            var pInterID = result_object.results.bindings[0].pathNextToID.value;
//            var pInterPath = new Array();
//            var pInterPathStringTo;
//            var count = 0;
//            var bool = true;
//            while(bool)
//            {
//				//alert("Count" + count + " ID: " +pInterID);
//                var query = "SELECT ?pathNextToID ?pTo "+
//                    "WHERE{"+
//                    "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+pInterID+"\"."+
//                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
//                    "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
//                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
//                    "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
//                    "}";
//                console.log(query);
//                var result_object_to = sparql_query (query);
//                //alert(JSON.stringify(result_object));
//                //alert(result_object.results.bindings[0].pathNextToID.value);
//
//                //console.log(result_object.results.bindings);
//                if(result_object_to.results.bindings==="")
//                {
//                    bool = false;
//                    //alert("Test");
//                    //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
//                    //	alert("Working");
//                    //}
//                }//END OF IF
//                else if(pInterID==="pathEnd")
//                {
//                        bool = false;
//                        //alert("Test");
//                        //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
//                        //	alert("Working");
//                        //}
//                }//END OF IF
//                else
//                {			
//                    pInterID  = result_object_to.results.bindings[0].pathNextToID.value;
//                    pInterPath[count] = result_object_to.results.bindings[0].pTo.value;
////                    console.log("2: "+pFrom);
//                    count++;
//                    pInterPathStringTo = pInterPath[0];
//                    for(var j = 1; j<count-1; j++)
//                    {
//                        pInterPathStringTo = pInterPathStringTo + "-" + pInterPath[j];
//                    }//END OF FOR LOOP	
//                }//END OF ELSE
//            }//END OF WHILE
//                //alert(pInterPathStringTo);
//
//            pInterID = result_object.results.bindings[0].pathNextFromID.value;
//            pInterPath = new Array();
//            var pInterPathStringFrom;
//            bool = true;
//            count = 0;
//            while(bool){
//                //alert("Count" + count + " ID: " +pInterID);
//                var query = "SELECT ?pathNextToID ?pTo "+
//                    "WHERE{"+
//                    "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+pInterID+"\"."+
//                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
//                    "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
//                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?pathNextTo."+
//                    "?pathNextTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?pathNextToID."+
//                    "}";
//                //alert(query);
//                var result_object_from = sparql_query (query);
//                //alert(JSON.stringify(result_object));
//                //alert(result_object_from.results.bindings[0].pathNextToID.value);
//
//                //console.log(result_object.results.bindings);
//                if(result_object_from.results.bindings==="")
//                {
//                        bool = false;
//                        //alert("Test");
//                        //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
//                        //	alert("Working");
//                        //}
//                }//END OF IF
//                else if(pInterID==="pathEnd")
//                {
//                        bool = false;
//                        //alert("Test");
//                        //if(typeof result_object.results.bindings[0].pathNextToID===undefined){
//                        //	alert("Working");
//                        //}
//                }//END OF IF
//                else
//                {			
//                        //result_object_from.results.bindings[0].pTo2.value;
//                        pInterID  = result_object_from.results.bindings[0].pathNextToID.value;
//                        pInterPath[count] = result_object_from.results.bindings[0].pTo.value;
//                        var pFrom = result_object_from.results.bindings[0].pTo.value;
////                        console.log("3: "+pFrom);
//                        count++;
//                        pInterPathStringFrom = pInterPath[0];
//                        for(var j = 1; j<count-1; j++)
//                        {
//                                pInterPathStringFrom = pInterPathStringFrom + "-" + pInterPath[j];
//                        }//END OF FOR LOOP
//                }//END OF ELSE
//            } //END OF WHILE		
//            jsonString  = jsonString + "[\""+hours+":"+mins+"\", \""+(parseInt(hours, 10) + duration[1])+":00\", \""+pTo+"\", \""+pInterPathStringTo+"\", \""+pFrom+"\", \""+pInterPathStringFrom+"\"],";
            jsonString  = jsonString + "[\""+hours+":"+mins+"\", \""+(parseInt(hours, 10) + duration[1])+":00\"],";

        } //END OF IF
        else 
        {
            //alert("It did equal 1!");
//            jsonString  = jsonString + "[\"\", \"\", \"\", \"\", \"\", \"\"],";
            jsonString  = jsonString + "[\"\", \"\"],";

        } //END OF ELSE
        console.log(jsonString);
        currentDay++;
        if(currentDay > daysInMonth)
        {
            currentDay = 1;
            currentMonth++;
        }

        
    } //END OF FOOR LOOP (7 DAYS)

    jsonString = "{\"data\": ["+jsonString+"]}";
    
    var d = new Date();
//    log_data = log_data + d.getTime() + jsonString;
    
    var jsonObject = eval("(" + jsonString + ")");
    //console.log (jsonObject);
    //alert(jsonObject.data[0][0]);

    return jsonObject;

}//END OF FUNCTION


/////////////////////////////////

function parseDayScheduleJson(jsonObj) 
{
    set_start_date();
    activities_overwrite = testDates("OfficeWork"); //Overwrite is used to test the next values as well (lunch breaks, etc.)
    
    if(activities_overwrite){//Check to see if these activites exists already in the ontology.
		
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
                //Create a date from times as a unique id and to also be used for calculating durations
                //IMPORTANT, you must use the jQuery to avoid passing date by reference (e.g. using storeDate);
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
//                console.log(entrance + " : " + enPath + " : " + officeName);
                var pathTo = checkPathFrom(entrance, enPath, officeName); //bobbb
                var pathFrom = checkPathTo(officeName, exPath, exit);
                
                if(current_building===2)
                {
                    
                    pathTo = checkPathFrom(entrance, enPath, officeName); 
                    pathFrom = checkPathTo(officeName, exPath, exit);
                    
                }
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
//                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeActivity"+userID+"-"+queryDate+">"+
//                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo> ?pathTo."+
//                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeActivity"+userID+"-"+queryDate+">"+
//                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom> ?pathFrom."+
                    "}" 
                //alert(query);
                sparql_delete (query);
                query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeActivity"+userID+"-"+queryDate+">"+
                        "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeWork>; "+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"" + +userID+"-"+queryDate+"\";"+           
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \"" + userID +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> \"" + officeName +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \"" + queryDate +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> \"" + sTime + ":00\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> \""+ duration + "\";"+
//                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+pathTo+">;"+
//                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+pathFrom+">;+
                        "}";

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


    currentDay = currentDay + current;
//    alert(iActivities.length);
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

//        alert(JSON.stringify(result_object));
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

                pInterPathStringFrom = no_path_text;
                pInterPathStringTo = no_path_text;

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

            
                if(pInterPathStringTo===undefined){
                    pInterPathStringTo=no_path_text;
                }
                if(pInterPathStringFrom===undefined){
                    pInterPathStringFrom=no_path_text;
                }
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
//    var d = new Date();
//    log_data = log_data + d.getTime() + jsonString;

    var jsonObject = eval("(" + jsonString + ")");
//    console.log(jsonString);

    return jsonObject;
    //return jsonObject;

}//END OF FUNCTION

function parseBreaksJson(jsonObj, addDay) 
{
    
//    alert("!");
    set_start_date();
 
    currentDay = currentDay+addDay; //add the selected day to the current date
//    var d = new Date();
//    log_data = log_data + d.getTime()  + "parseBreaksJson\n";
//    console.log("Current Day: " + currentDay +" and addDay: " + addDay);
    
//    console.log(activities_overwrite);
    if(activities_overwrite === false)
    {
        activities_overwrite = testBreaksDates(addDay);
    }
//    console.log("Test");
    if(activities_overwrite === true)
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
//            console.log(officeName);
//            console.log(destination);
            var pathFrom = checkPathFrom(destination, returnPath, officeName);

            //checkAndDelete("IntermediateActivity", queryDate, userID ,type);
            //Must fix start day by converting to integer to add "i"
            
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
//            console.log(query);     
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

/*
 * 
 * QUERY LUNCH
 * 
 * 
 * 
 * 
 */

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

///////////////////////////////
//
//
//
// Meetings
//
//
//
////
function queryMeetings(current){

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
//        alert("!");
        var query = "SELECT ?startTime ?activity ?duration ?order ?roomNumber ?pathNextToID ?pathNextFromID ?pTo ?pFrom "+
            "WHERE{"+
            "?break  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Meeting>;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \""+userID+"\"."+
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \""+queryDate +"\"."+ 
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasOrder> \""+order +"\"."+ 
            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> ?roomNumber."+
//            "?break  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo>  ?pathTo."+
//            "?pathTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementTo."+
//            "?placementTo <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pTo." +
            "}";
        console.log(query);
//        alert(query);
        
        var result_object = sparql_query (query);

    //        alert(JSON.stringify(result_object));
        // get each binding (data point entry object) and append it to a "series" array
        var duration, start, order, roomNumber;

        if(result_object.results.bindings.length!==0)
        {
            
//            order = result_object.results.bindings[0].order.value;
            
            duration = result_object.results.bindings[0].duration.value;
            roomNumber = result_object.results.bindings[0].roomNumber.value;
    //            console.log("Duration: " + duration);
            var duration_array = convertMS(duration);	
    //            console.log("Days: " + duration_array[0]);
    //            console.log("Hours: " + duration_array[1]);
    //            console.log("Minutes: " + duration_array[2]);
    //            console.log("Seconds: " + duration_array[3]);
                //alert(duration[1]);
            start = result_object.results.bindings[0].startTime.value;
//            var pTo = result_object.results.bindings[0].pTo.value;
                //Needs to be fixed up!
                //duration = duration.substring(2, 3);
            var startHours = start.substring(0, 2);
            var endHours = parseInt(start.substring(0, 2))+duration_array[1];
            if(endHours<10)
            {
                endHours = "0"+endHours;
            }
            var startMins = start.substring(3,5)
            var endMins = parseInt(start.substring(3,5));
//                console.log("startHours: " + startHours);
//                console.log("endHours: " + endHours);
//                console.log("startMins: " + startMins);
//                console.log("endMins: " + endMins);
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

//                jsonString  = jsonString + "[\""+startHours+":"+startMins+"\", \""+endHours+":"+endMins+"\", \""+pTo+"\"],";
                jsonString  = jsonString + "[\""+startHours+":"+startMins+"\", \""+endHours+":"+endMins+"\", \""+roomNumber+"\"],";
                order++;
        } 
        else {

            if(y!==0){
//                jsonString  = jsonString + "[\"\", \"\", \"\", \"\", \"\"],";
                jsonString  = jsonString + "[\"\", \"\", \"\"],";
            }
        }//END OF ELSE

    }  //END OF FOR LOOP THROUGH ALL MEETINGS FOR THAT DAY

    //CREATE AN ARRAY TO STORE THE 7 DAYS OF BREAKS

    jsonString = "{\"data\": ["+jsonString+"]}";
//    var d = new Date();
//    log_data = log_data + d.getTime() + jsonString;

    var jsonObject = eval("(" + jsonString + ")");
    console.log(jsonString);

    return jsonObject;
    //return jsonObject;

}//END OF FUNCTION

function parseMeetingsJson(jsonObj, addDay) 
{
    
//    console.log("TEST: " + addDay);
    set_start_date();
 
    currentDay = currentDay+addDay; //add the selected day to the current date
    //set_current_date();

    if(activities_overwrite === false)
    {
        activities_overwrite = testDates("Meeting"); 
    }


    if(activities_overwrite === true)
    {

//        console.log(jsonObj);

        count = 0;
        for(var i = 0; i<jsonObj.length; i++)
        {

            if(jsonObj[i][0]!=="")
            {
                var sTime, eTime, duration, exit, enPath, exPath = undefined, count;

                sTime = jsonObj[i][0];

        //        console.log(sTime);

                if(sTime!==null)
                {//Start time is taken from jsonobject returned from Handsontable
                    //Calculate DURATION
                    var date = $( "#datepicker" ).datepicker('getDate');
                    date.setHours(sTime.substring(0, 2));
                    date.setMinutes(sTime.substring(3, 5));
        //            console.log(sTime.substring(0, 2));
        //                console.log(sTime.substring(3, 5));
                    eTime = jsonObj[i][1];
        //            console.log(date.getHours());
                    var date2 = $( "#datepicker" ).datepicker('getDate');
        //            console.log(date2.getDate());
                    date2.setHours(eTime.substring(0, 2));
                    date2.setMinutes(eTime.substring(3, 5));

                    duration = date2 - date;
        //            console.log(duration);
                    exit = jsonObj[i][2]; //Indicates destination (where lunch takes place)
                    enPath = jsonObj[i][3]; //Indicates path taken (to location of lunch)
                    exPath = jsonObj[i][4]; //Indicates path returned (from of lunch to work place/office)
                    
                    var pathTo; //bobbb
                    var pathFrom;
                //  var pathTo = checkPathTo(officeName, enPath, exit); //bobbb
        //          var pathFrom = checkPathFrom(exit, exPath, officeName);
                    if(exit==="S05")
                    {
//                        alert("Test"+jsonObj[i][2]);
                        pathTo = "PathMeetingS05";
                        pathFrom = "PathMeetingS05";
                    }
                    if(exit==="S06")
                    {
//                        alert("Test"+jsonObj[i][2]);
                        pathTo = "PathMeetingS06";
                        pathFrom = "PathMeetingS06";
                    }
                    if(exit==="S07")
                    {
//                        alert("Test"+jsonObj[i][2]);
                        pathTo = "PathMeetingS07";
                        pathFrom = "PathMeetingS07";
                    }
                    if(exit==="R06")
                    {
//                        alert("Test"+jsonObj[i][2]);
                        pathTo = "PathMeetingR06";
                        pathFrom = "PathMeetingR06";
                    }
                    else if(exit==="P1")
                    {
                        pathTo = "PathP1";
                        pathFrom = "PathP1";
                    }
                    else if(exit==="P4")
                    {
                        pathTo = "PathP4";
                        pathFrom = "PathP4";
                    }
                    else if(exit==="P5")
                    {
                        pathTo = "PathP5";
                        pathFrom = "PathP5";
                    }
                    else if(exit==="P6")
                    {
                        pathTo = "PathP6";
                        pathFrom = "PathP6";
                    }
                    set_current_date();

                    query = "DELETE WHERE{"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#MeetingActivity"+count+"-"+userID+"-"+queryDate+">"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?userID."+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#MeetingActivity"+count+"-"+userID+"-"+queryDate+">"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> ?queryDate."+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#MeetingActivity"+count+"-"+userID+"-"+queryDate+">"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#MeetingActivity"+count+"-"+userID+"-"+queryDate+">"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#MeetingActivity"+count+"-"+userID+"-"+queryDate+">"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasOrder> ?order."+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#MeetingActivity"+count+"-"+userID+"-"+queryDate+">"+
                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> ?officeName."+ 
//                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#MeetingActivity"+count+"-"+userID+"-"+queryDate+">"+
//                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo> ?pathTo."+
//                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#MeetingActivity"+count+"-"+userID+"-"+queryDate+">"+
//                            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom> ?pathFrom."+
                            "}" 
                        "}" 
                    console.log(query);  
//                    alert(query);
                    sparql_delete (query);
                    var query = "";
                    query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#MeetingActivity"+count+"-"+userID+"-"+queryDate+">"+
                        "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Meeting>; "+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> \"" + userID +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> \"" + queryDate +"\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> \"" + sTime + ":00\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> \""+ duration + "\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasOrder> \""+ count + "\";"+
                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> \""+ exit + "\";"+
//                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathMeeting>;"+
//                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathMeeting>;}";
//                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathTo> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+pathTo+">;"+
//                        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+pathFrom+">;\n\
                        "}";	
                    console.log(query);
                    if(duration!=="NaN"||duration!=="0")
                    {
                        sparql_update (query);
                    }
                    else 
                        {
                            console.log("Problem with meetings INSERT duration - " + duration);
                        }

                    //alert(result_object);
                    count++;
                } //END OF FOR
            }//End IF (checking json row is not empty)
                
        } //END OF IF
    }

    //console.log (jsonObj); // print it out series to console for checking

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