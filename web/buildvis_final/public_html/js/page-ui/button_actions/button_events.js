// * Version: 0.1
// * 
// * Date: 29/03/2014
// *  
// * Author: Dr. Kris McGlinn
// * 
// * Last Modified: 29/03/2014
// * 
// * Copyright: 	Knowledge and Data Engineering Group, 
// * 				Department of Computer Science,
// * 				Faculty of Engineering and Systems Science,
// * 				Trinity College
// * 				Dublin 2
// * 				Ireland  
// * 

var week_schedule = new Array();
var lunch_schedule = new Array();
var meeting_schedule = new Array();
var daily_meetings = new Array();

/*This function will hook up to the id's of the HTML 
 * elements and create an array of schedules for the
 * different activities
 * NOTE:: We probably have to think of a way of doing this 
 * for meetings which makes most sense
 * NOTE:: I will then write a function whic
 */

function button_save_activities()
{
    //save_day_schedule(document.getElementById('?').value, document.getElementById('?').value, document.getElementById('?').value, document.getElementById('?').value);
    //repeat x7
         
    
    //activities_sparql_update();
}

function save_day_schedule(date, start, duration, location)
{
    
    var d = new Event(date, start, duration, location);
    lunch_schedule.push(d);
    
}

function save_lunch_schedule(date, start, duration, location)
{
    
    var d = new Event(date, start, duration, location);
    lunch_schedule.push(d);
    
}

function save_daily_meeting_schedule(date, start, duration, location)
{
    
    var d = new Event(date, start, duration, location);
    meeting_schedule.push(d);
    
}

function Event(date, start, duration, location){
    
    this.date = date;
    this.start = start;
    this.duration = duration;
    this.location = location;
        
}

