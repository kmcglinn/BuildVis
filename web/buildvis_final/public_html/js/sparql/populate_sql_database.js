/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Activity(type, id, value, date, startTime, duration, user_id, zone_id){
    
    this.type = type;
    this.id = id;
    this.value = value;
    this.date = date;
    this.startTime = startTime;
    this.duration = duration;
    this.user_id = user_id;
    this.zone_id = zone_id;
//    this.perimeters = perimeters;
        
}

/*
 * This function populates three arrays, work_desk_activities, lunch_activities
 *  and meeting_activities, with all instances of these type in the rdf data base
 * @returns {undefined}
 */

function populate_sql_database_activities_from_ontology()
{
    
    var uid = '0077';
    
    console.log('Querying Ontology for activities to populate sql database');
    
    var act;

        /*Lunch Breaks*/
 
        var lunch_activities = new Array();
        var work_desk_activities = new Array();
        var meeting_activities = new Array();
        
        var query = "SELECT DISTINCT ?lunch ?user_id ?date ?duration ?startTime ?pFrom "+
            "WHERE{"+
            "?lunchBreak  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity>;"+
//            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?user_id."+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> '"+uid+"'."+
//            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?user_id."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityType> 'Lunch'."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> ?date."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
            "?lunchBreak <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> ?pFrom." +
            "}";
    
        console.log(query);
        var result_object = sparql_query (query);
        var guid, user_id, activity_type, date, duration, startTime, zone_id;
        
        if(result_object.results.bindings.length!==0)
        {
            
            for(var j = 0; j < result_object.results.bindings.length; j++)
            {
                
//                guid = result_object.results.bindings[j].guid.value;
//                console.log(guid);
                zone_id = result_object.results.bindings[j].pFrom.value;
//                console.log(zone_id);
                user_id = uid//result_object.results.bindings[j].user_id.value;
//                console.log(user_id);
                date = result_object.results.bindings[j].date.value;
//                console.log(date);
                duration = result_object.results.bindings[j].duration.value;
//                console.log(duration);
                startTime = result_object.results.bindings[j].startTime.value;
//                console.log(startTime);
                //(type, id, value, date, startTime, duration, user_id, zone_id)
                if(user_id!=='001')
                {
                    act = new Activity("lunch", guid, "1", date, startTime, duration, user_id, zone_id);
                }
                lunch_activities.push(act);
            }
            
        }
        
        
        /*Meeting Breaks*/
        var query = "SELECT ?guid ?user_id ?date ?duration ?startTime ?pFrom "+
            "WHERE{"+
            "?meetings  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity>;"+
//            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?user_id."+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> '"+uid+"'."+
            "?meetings  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityType> 'Meeting'."+
            "?meetings  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> ?date."+
            "?meetings  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
            "?meetings  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
            "?meetings  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> ?pFrom." +
            "}";
    
        var result_object = sparql_query (query);
        console.log(query);
       // var guid, user_id, date, duration, startTime, zone_id;
        
        if(result_object.results.bindings.length!==0)
        {
            
            for(var j = 0; j < result_object.results.bindings.length; j++)
            {
                
//                guid = result_object.results.bindings[j].guid.value;
//                console.log(guid);
                zone_id = result_object.results.bindings[j].pFrom.value;
//                console.log(zone_id);
                user_id = uid//result_object.results.bindings[j].user_id.value;
//                console.log(user_id);
                date = result_object.results.bindings[j].date.value;
//                console.log(date);
                duration = result_object.results.bindings[j].duration.value;
//                console.log(duration);
                startTime = result_object.results.bindings[j].startTime.value;
//                console.log(startTime);
                //(type, id, value, date, startTime, duration, user_id, zone_id)
                if(user_id!=='001')
                {
                    act = new Activity("meeting", guid, "1", date, startTime, duration, user_id, zone_id);
                }
                meeting_activities.push(act);
            }
            
        }
        
        /*Desk Work*/        
        var query = "SELECT ?guid ?user_id ?date ?duration ?startTime ?room_number "+
            "WHERE{"+
            "?day_work  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#ScheduledActivity>;"+
//            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> ?user_id."+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasUserID> '"+uid+"'."+
            "?day_work  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityType> 'WorkPlace'."+
            "?day_work  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartDate> ?date."+
            "?day_work  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasStartTime> ?startTime."+
            "?day_work  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDuration> ?duration."+
            "?day_work <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> ?room_number." +
//            "?lunchBreak  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPathFrom>  ?pathFrom."+
//            "?pathFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placementFrom."+
//            "?placementFrom <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?pFrom." +
            "}";
    
        console.log(query);
        var result_object = sparql_query (query);

        //var guid, user_id, date, duration, startTime, pFrom;
        
        if(result_object.results.bindings.length!==0)
        {
            
            for(var j = 0; j < result_object.results.bindings.length; j++)
            {
                activity_type = 'work_place';//= result_object.results.bindings[j].activity_type.value;
//                guid = result_object.results.bindings[j].guid.value;
//                console.log(guid);
                zone_id = result_object.results.bindings[j].room_number.value;
//                console.log(zone_id);
                user_id = uid//result_object.results.bindings[j].user_id.value;
//                console.log(user_id);
                date = result_object.results.bindings[j].date.value;
//                console.log(date);
                duration = result_object.results.bindings[j].duration.value;
//                console.log(duration);
                startTime = result_object.results.bindings[j].startTime.value;
//                console.log(startTime);
                //(type, id, value, date, startTime, duration, user_id, zone_id)
                if(user_id!=='001')
                {
//                    console.log('Adding activity user id: '+ user_id);
                    act = new Activity(activity_type, guid, "1", date, startTime, duration, user_id, zone_id);
                }
//                console.log(act.toString());
                work_desk_activities.push(act);
            }
            
//            console.log(work_desk_activities.length);
        }
        console.log('Calculating activites (e.g. desk_work, lunch, meetings) from ontology query result');
        console.log('Number of desk_work activities = ' + work_desk_activities.length);
        console.log('Number of lunch activities = ' + lunch_activities.length);
        console.log('Number of meeting activities = ' + meeting_activities.length);
        calculate_activities(work_desk_activities, lunch_activities, meeting_activities, "2014-05-01", "00:00:00", 10)
        
//    }
    
}

/*
 * 
 * @param {type} work
 * @param {type} lunch
 * @param {type} meeting
 * @param {type} startDate
 * @param {type} startTime
 * @param {type} interval
 * @returns {undefined}
 * 
 * This function takes three arrays storing work, lunch and meeting activities, a start date and time to begin searching and a time interval 
 * and changes the state of an sql database with values (DATETIME, ACTIVITY.ID,  ACTIVITY.TYPE, Occupied (1/0), ACTIVITY.USEID, ACTIVITY.ZONEID) for each time interval (e.g. every 10 minutes)
 */

function calculate_activities(work, lunch, meeting, startDate, startTime, interval)
{

    var bool_meet = false;
    var bool_lunch = false;
    var intervalMS = interval * 60000;
    

    
    var thisDate = new Date(); //Stores a date which begins as the start date
    var todays_Date = new Date(); //Stores Todays Date (the date when this code is run)
    var count = 0;
    
    //First set thisDate to equal the current startDate
    var string_array = startDate.split('-'); //Splits Start Date into year, month, day
    
    thisDate.setFullYear(string_array[0]);
    thisDate.setMonth(string_array[1]);
    thisDate.setDate(string_array[2]);
    
    string_array = startTime.split(':'); //Splits Start time into hour, minute, seconds and milliseconds
    
    thisDate.setHours(string_array[0]);
    thisDate.setMinutes(string_array[1]);
    thisDate.setSeconds('0');
    thisDate.setMilliseconds('0');
//    endTime = thisDate;
    
    console.log('Begin searching from start date: ');
    console.log("Check Date: " + thisDate.toUTCString());
    console.log("End Date: " + todays_Date.toUTCString());

    var date1 = ''+ todays_Date.getDate() + todays_Date.getMonth() + todays_Date.getFullYear();
    var date2 = ''+ thisDate.getDate() + thisDate.getMonth() + thisDate.getFullYear();
    //While 1:  While Current Date (thisDate) does not equal todays date, keep searching. 
    while(date1!==date2)
    {
//        console.log("Check Date: " + thisDate.toUTCString());
//        console.log("End Date: " + todays_Date.toUTCString());
        count = 0;

        //For Loop 1: Goes Through all the work activities in the work array
        for(var i = 0; i<work.length; i++)
        {

            
//            if(work[i].user_id==='00077')
//            {
                
            string_array = work[i].date.split('-'); //Splits each work activity date into year, month, day
            
            var st1 = work[i].date;                    
            var st2 = Number(thisDate.getDate())+'-'+Number(thisDate.getMonth()+1)+'-'+Number(thisDate.getFullYear());
            

            //If Statement 1: This checks to see if the first work activity date equals thisDate (which begins as startDate)
            if(st1===st2)
            {
             
//                console.log("Work Date: " + st1);
//                console.log("Check Date: " + st2);
               
                //If Statement 2: This checks to see if thisDate start time is greater than work activity start time
                if(thisDate.getHours()>=work[i].startTime.split(":")[0])
                {
                    //If Statement 3: This checks to see if thisDate start time is greater than work activity start time
                    if(thisDate.getMinutes()>=work[i].startTime.split(":")[1])
                    {
                        
                        work[i].startTime = work[i].startTime.split(":")[0]+':00'+':00'; //Startime must be reset as the second check, will miss all values before 
                            
                        //If Statement 4: if thisDate is now less than the endTime of that day
                        if(work[i].duration>0)
                        {  
                            var c = 0;
                            bool_meet = false;
                            bool_lunch = false; //This variable set meeting or lunch to false, this will only be set to true if the next for loops find a lunch activity with same ids and date. 

                            //For Loop 2: Goes Through all the lunch activities in the lunch array
                            for(var j = 0; j<lunch.length; j++)
                            {
//                                if(lunch[j].user_id==='00077'){
//                                c++;
//                                console.log(c);
//                                console.log(lunch[j].date);
//                                console.log(lunch[j].user_id);
                                //If Statement 5: if lunch activity date equals work activity date, user id's equal and zone ids equal
                                if((lunch[j].date===work[i].date)&&(lunch[j].user_id===work[i].user_id)/*&&(lunch[j].zone_id===work[i].zone_id)*/)
                                {

                                    //If Statement 7: If thisDate time is greater than lunch activity start time 

                                    if(thisDate.getHours()>=lunch[j].startTime.split(":")[0])
                                    {
                                        if(thisDate.getMinutes()>=lunch[j].startTime.split(":")[1])
                                        {
                                            lunch[j].startTime = lunch[j].startTime.split(":")[0]+':00'+':00'; 
//                                            console.log(lunch[j].duration);
                                            if(lunch[j].duration>0)
                                            {

                                                bool_lunch = true;
                                                count = j;
                                                lunch[j].duration = lunch[j].duration - intervalMS;
                                            }

                                        }
                                    }
//                                        }
                                }
//                                }
                            }
                            //End For Loop 2
                            //For Loop 3: Goes Through all the meeting activities in the meeting array
                            for(var j = 0; j<meeting.length; j++)
                            {

                                if((meeting[j].date===work[i].date)&&(meeting[j].user_id===work[i].user_id))
                                {

                                    if(thisDate.getHours()>=meeting[j].startTime.split(":")[0])
                                    {
                                        if(thisDate.getMinutes()>=meeting[j].startTime.split(":")[1])
                                        {
                                            meeting[j].startTime = meeting[j].startTime.split(":")[0]+':00'+':00'; 

                                            if(meeting[j].duration>0)
                                            {
                                                bool_meet = true;
                                                count = j;
                                                meeting[j].duration = meeting[j].duration - intervalMS;
                                            }



                                        }
                                    }
//                                        }
                                }
                            }
                            //End For Loop 3

                            //If neither a meeting nor a lunch break are covering this time interval, update the sql database with a work activity

                            if(bool_lunch) //Update data base with w rok activity
                            {
//                                    count++;
                                var date = thisDate.toMysqlFormat();//var date = thisDate.toString('yyyy-MM-dd');//+" "+thisDate.getHours()+":"+thisDate.getMinutes()+":"+thisDate.getSeconds();
                                if(current_building === 2)
                                {                                           

                                    lunch[count].zone_id = 'P1';

                                }    
//                                console.log('ADD LUNCH');
                                write_database_values(date, count, lunch[count].type, "1", lunch[count].user_id, lunch[count].zone_id, buildings[current_building]);

                            }
                            else if(bool_meet) //Update data base with w rok activity
                            {

                                var date = thisDate.toMysqlFormat();//var date = thisDate.toString('yyyy-MM-dd');//+" "+thisDate.getHours()+":"+thisDate.getMinutes()+":"+thisDate.getSeconds();
                                write_database_values(date, count, meeting[count].type, "1", meeting[count].user_id, meeting[count].zone_id, buildings[current_building]);
                            }
                            else 
                            {
                                //Enter in a value to the sql database
                                var date = thisDate.toMysqlFormat();//= thisDate.toString('yyyy-MM-dd');//+" "+thisDate.getHours()+":"+thisDate.getMinutes()+":"+thisDate.getSeconds();
                                write_database_values(date, count, work[i].type, "1", work[i].user_id, work[i].zone_id, buildings[current_building]);
                            }

                            work[i].duration = work[i].duration - intervalMS;

                        }

                    //End If 4 
                    }                     
                      //End If 3  
                }
                //End If 2               
            }
            //End If 1
//        }//end if to check id

        }
        //For Loop 1
        thisDate.setMinutes(thisDate.getMinutes()+interval); //Increments minutes of thisDate, until this date equals todays date, at which point it stops

        date2 = ''+ thisDate.getDate() + thisDate.getMonth() + thisDate.getFullYear();
//        console.log("Check Date: " + date2);
//        console.log("End Date: " + date1);
    }
    //End While 1

    console.log("Fini");
//    write_database_values(time, id, type, value, user_id, zone_id)
}

//function calculate_activities(work, lunch, meeting, startDate, startTime, interval)
//{
//    
//    var intervalMS = interval * 60000;
//    console.log('Calculating activites (e.g. desk_work, lunch, meetings) from ontology query result');
//    console.log('Number of desk_work activies = ' + work.length);
//    console.log('Number of lunch activies = ' + lunch.length);
//    console.log('Number of meeting activies = ' + meeting.length);
//    
//    var thisDate = new Date(); //Stores a date which begins as the start date
//    var todays_Date = new Date(); //Stores Todays Date (the date when this code is run)
//    var endTime = new Date(); //Stores thisDate with the end time of of the work day (by adding on the duration to the current (this) days start time)
//    var count = 0;
////    todays_Date.setFullYear("2012");
////    todays_Date.setMonth("12");
////    todays_Date.setDate("28");
////    todays_Date.setMilliseconds("0");
//    
//    //First set thisDate to equal the current startDate
//    var string_array = startDate.split('-'); //Splits Start Date into year, month, day
//    
//    thisDate.setFullYear(string_array[0]);
//    thisDate.setMonth(string_array[1]);
//    thisDate.setDate(string_array[2]);
//    
//    string_array = startTime.split(':'); //Splits Start time into hour, minute, seconds and milliseconds
//    
//    thisDate.setHours(string_array[0]);
//    thisDate.setMinutes(string_array[1]);
//    thisDate.setSeconds('0');
//    thisDate.setMilliseconds('0');
////    endTime = thisDate;
//    
//    console.log('Begin searching from start date: ');
//    console.log("Check Date: " + thisDate.toUTCString());
//    console.log("End Date: " + todays_Date.toUTCString());
//
//    var date1 = ''+ todays_Date.getDate() + todays_Date.getMonth() + todays_Date.getFullYear();
//    var date2 = ''+ thisDate.getDate() + thisDate.getMonth() + thisDate.getFullYear();
//    //While 1:  While Current Date (thisDate) does not equal todays date, keep searching. 
//    while(date1!==date2)
//    {
//
//        count = 0;
////        console.log("Todays Date: " + todays_Date.toUTCString());
////        console.log("Start Date: " + thisDate.toUTCString());
//        //For Loop 1: Goes Through all the work activities in the work array
//        for(var i = 0; i<work.length; i++)
//        {
//
//            
//            if(work[i].user_id==='00077')
//            {
//                
//            string_array = work[i].date.split('-'); //Splits each work activity date into year, month, day
//            var st1 = work[i].date;
//            
////            console.log("Work date: " + work[i].date);
////            console.log(string_array);
//            
//   
// 
////            console.log("Number(string_array[2]): "+Number(string_array[2]));   
////            console.log("Number(string_array[1]): "+Number(string_array[1]));  
////            console.log("Number(string_array[0]): "+Number(string_array[0])); 
//////            
////            console.log("thisDate.getFullYear(): "+Number(thisDate.getFullYear()));    
////            console.log("thisDate.getMonth(): "+Number(thisDate.getMonth()+1));  
////            console.log("thisDate.getDate(): "+Number(thisDate.getDate()));  
//            
//            var st2 = Number(thisDate.getDate())+'-'+Number(thisDate.getMonth()+1)+'-'+Number(thisDate.getFullYear());
//            //If Statement 1: This checks to see if the first work activity date equals thisDate (which begins as startDate)
//            if(st1===st2)
//            {
////                console.log("This date: " + work[i].date);
////                console.log("This time: " + thisDate.getHours() + ":" + thisDate.getMinutes());
////                console.log("This year: " + Number(string_array[0]));
////                console.log("This month: " + Number(string_array[1]));
////                
//                if(thisDate.getHours()>work[i].startTime.split(":")[0])
//                {
//                    work[i].startTime = work[i].startTime.split(":")[0]+':00'+':00'; //This resets start time so that with each hourly iteration, it does not start at the mid hour. 
////                    alert('Updating start time!!!'+ work[i].startTime);
//                }
////                console.log("This date: " + thisDate.toString());
//               
//                //If Statement 2: This checks to see if thisDate start time is greater than work activity start time
//                if(thisDate.getHours()>=work[i].startTime.split(":")[0])
//                {
//                    //If Statement 3: This checks to see if thisDate start time is greater than work activity start time
////                    console.log(work[i].startTime);
////                    console.log(work[i].startTime.split(":")[1]);
//                    if(thisDate.getMinutes()>=work[i].startTime.split(":")[1])
//                    {
//
//                        /*
//                         * If thisDate is equal to work activity date and thisDate time is greater than work activity time set endTime to thisDate and work duration
//                         */
//                        endTime.setFullYear(thisDate.getFullYear());
//                        endTime.setMonth(thisDate.getMonth());
//                        endTime.setDate(thisDate.getDate());
//                        endTime.setHours(work[i].startTime.split(":")[0]);
//                        endTime.setMinutes(work[i].startTime.split(":")[1]);
//                        endTime.setSeconds('0');
//                        endTime.setMilliseconds(endTime.getMilliseconds()+work[i].duration); //This adds the duration onto the endTime giving us the end time of the day.
////                        console.log("End time: " + endTime.toString());
////                        console.log("This time: " + thisDate.toString());
////                        
//                            //If Statement 4: if thisDate is now less than the endTime of that day
//                            if(thisDate<endTime)
//                            {  
//                                
//
//                                var bool_meet = false;
//                                var bool_lunch = false; //This variable set meeting or lunch to false, this will only be set to true if the next for loops find a lunch activity with same ids and date. 
////                                console.log(lunch.length);
////                                
//                                //For Loop 2: Goes Through all the lunch activities in the lunch array
//                                for(var j = 0; j<lunch.length; j++)
//                                {
//                                    //If Statement 5: if lunch activity date equals work activity date, user id's equal and zone ids equal
//                                    if((lunch[j].date===work[i].date)&&(lunch[j].user_id===work[i].user_id)/*&&(lunch[j].zone_id===work[i].zone_id)*/)
//                                    {
//
//                                        
//                                        //If Statement 7: If thisDate time is greater than lunch activity start time 
//                                        
//                                        if(thisDate.getHours()>=lunch[j].startTime.split(":")[0])
//                                        {
//                                            if(thisDate.getMinutes()>=lunch[j].startTime.split(":")[1])
//                                            {
//                                                lunch[j].startTime = lunch[j].startTime.split(":")[0]+':00'+':00'; 
//                                                if(lunch[j].duration>0)
//                                                {
//
////                                                    endTime.setFullYear(thisDate.getFullYear());
////                                                    endTime.setMonth(thisDate.getMonth());
////                                                    endTime.setDate(thisDate.getDate());
////                                                    endTime.setHours(lunch[j].startTime.split(":")[0]);
////                                                    endTime.setMinutes(lunch[j].startTime.split(":")[1]);
////                                                    endTime.setSeconds('0');
////                                                    endTime.setMilliseconds(endTime.getMilliseconds()+lunch[j].duration);
//                                                    bool_lunch = true;
//                                                    count = j;
//                                                }
////                                                console.log(lunch[j].duration);
////                                                console.log(intervalMS);
//                                                lunch[j].duration = lunch[j].duration - intervalMS;
//
////                                                if(thisDate<endTime)
////                                                {  
////                                                    count = j;
////                                                    console.log(count);
////                                                    bool_lunch = true;
////                                                }
//
//                                            }
//                                        }
////                                        }
//                                    }
//                                }
//                                //End For Loop 2
//                                //For Loop 3: Goes Through all the meeting activities in the meeting array
//                                for(var j = 0; j<meeting.length; j++)
//                                {
//   
//                                    if((meeting[j].date===work[i].date)&&(meeting[j].user_id===work[i].user_id))
//                                    {
//
//                                        string_array = meeting[j].date.split('-');
//                            //            console.log("1: "+Number(string_array[2]));
//                            //            console.log("2: "+Number(thisDate.getDate()));     
//                                        if(thisDate.getHours()>meeting[j].startTime.split(":")[0])
//                                        {
//                                            meeting[j].startTime = meeting[j].startTime.split(":")[0]+':00'+':00';
//                        //                    alert('Updating start time!!!'+ work[i].startTime);
//                                        }
//                                        if(thisDate.getHours()>=meeting[j].startTime.split(":")[0])
//                                        {
//                                            if(thisDate.getMinutes()>=meeting[j].startTime.split(":")[1])
//                                            {
//
//                                                endTime.setFullYear(thisDate.getFullYear());
//                                                endTime.setMonth(thisDate.getMonth());
//                                                endTime.setDate(thisDate.getDate());
//                                                endTime.setHours(meeting[j].startTime.split(":")[0]);
//                                                endTime.setMinutes(meeting[j].startTime.split(":")[1]);
//                                                endTime.setSeconds('0');
//                                                endTime.setMilliseconds(endTime.getMilliseconds()+meeting[j].duration);
//
//                                                if(thisDate<endTime)
//                                                {  
//                                                    count = j;
////                                                    console.log(count);
//                                                    bool_meet = true;
//                                                }
//
//                                            }
//                                        }
////                                        }
//                                    }
//                                }
//                                //End For Loop 3
//                                
//                                //If neither a meeting nor a lunch break are covering this time interval, update the sql database with a work activity
//                                
//                                if(bool_lunch) //Update data base with w rok activity
//                                {
////                                    count++;
//                                    var date = thisDate.toMysqlFormat();//var date = thisDate.toString('yyyy-MM-dd');//+" "+thisDate.getHours()+":"+thisDate.getMinutes()+":"+thisDate.getSeconds();
////                                    console.log('Lunch Activity|| Date: ' + date + ' Count: ' + count + ' Type: ' + lunch[count].type + ' User_Id: ' + lunch[count].user_id + ' Zone_Id: ' + lunch[count].zone_id);
//                                    if(current_building === 2)
//                                        {                                           
//                                                                                      
//                                            lunch[count].zone_id = 'P1';
//                                            
//                                        }    
//                                        
//                                    write_database_values(date, count, lunch[count].type, "1", lunch[count].user_id, lunch[count].zone_id, buildings[current_building]);
//
//                                }
//                                else if(bool_meet) //Update data base with w rok activity
//                                {
//
//                                    var date = thisDate.toMysqlFormat();//var date = thisDate.toString('yyyy-MM-dd');//+" "+thisDate.getHours()+":"+thisDate.getMinutes()+":"+thisDate.getSeconds();
//                                    write_database_values(date, count, meeting[count].type, "1", meeting[count].user_id, meeting[count].zone_id, buildings[current_building]);
//                                }
//                                else 
//                                {
//                                    //Enter in a value to the sql database
//                                    var date = thisDate.toMysqlFormat();//= thisDate.toString('yyyy-MM-dd');//+" "+thisDate.getHours()+":"+thisDate.getMinutes()+":"+thisDate.getSeconds();
//                                    write_database_values(date, count, work[i].type, "1", work[i].user_id, work[i].zone_id, buildings[current_building]);
//                                }
//                      
//                                //console.log(work[i].startTime.split(":")[0]);
////                                    console.log(work[i].duration);
//
//                                    
// 
//                            }
//                        //End If 4 
//                    }                     
//                      //End If 3  
//                }
//                //End If 2               
//            }
//            //End If 1
//        }//end if to check id
//
//        }
//        //For Loop 1
//        thisDate.setMinutes(thisDate.getMinutes()+interval); //Increments minutes of thisDate, until this date equals todays date, at which point it stops
//
//        date2 = ''+ thisDate.getDate() + thisDate.getMonth() + thisDate.getFullYear();
////        console.log("Check Date: " + date2);
////        console.log("End Date: " + date1);
//    }
//    //End While 1
//
//    console.log("Fini");
////    write_database_values(time, id, type, value, user_id, zone_id)
//}

/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};