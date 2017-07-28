/**
 * @author Kris McGlinn
 *
 */
/* 
 * Original Code Taken from: https://developers.google.com/api-client-library/javascript/start/start-js
 */


var clientId = '15433941002-106nckkmaqidrpu73h0vs4far335u7i3.apps.googleusercontent.com';
var calendarId = 'primary';

var apiKey = 'AIzaSyB_WG1D8JK5MHKMbp4bqDCgYMDW0gXn3zc';
var scopes = 'https://www.googleapis.com/auth/calendar';
var gcal_meetings_array = new Array();
var found_gcal_meetings_array = new Array();
var meetings_jsonObject = new Array();

function handleAuthResult(authResult) {

  if (authResult) {

    getGoogleMeetings();
    
  } else {

    authorizeButton.onclick = handleAuth;
    
   }
}


function handleAuth() {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}

function queryGoogleCalendar() {

    console.log('ACCESSING GOOGLE CALENDAR');
    if(current_building===7)
	{
	    calendarId = '7npmt33ice9c1vjc88e8i5nc60@group.calendar.google.com';
	}

    var r=confirm("Do you wish to allow access to your google calendars (you can load meetings etc.)");
    if (r==true)
    {
    
        document.getElementById('activity_button_load_gCal').style.visibility = 'visible';
        console.log('Querying Google Calendar');
        
        gapi.auth.authorize(
        {client_id: clientId, scope: scopes, immediate: false},
         handleAuthResult);

        gapi.client.load('calendar', 'v3', function() 
        {
	     
            var request = gapi.client.calendar.events.list
            ({
              'calendarId': calendarId,	
		'maxResults': '2500',
	       'orderBy': 'startTime',
		'singleEvents': 'true',
		'timeMin': '2014-01-01T00:00:00Z'
            });

            request.execute(function(resp) {
                if(resp.items===undefined)
                {
                    var r=confirm('There was an issue accessing your google calendar. Do you wish to try again?')  
                    if (r==true)
                    {
                        queryGoogleCalendar();
                    }

                }
                else if(resp.items.length<1)
                {  
                    
                    var r=confirm('Your calendar returned no meetings. Do you wish to try and access them them again?')  
                    if (r==true)
                    {
                        queryGoogleCalendar();
                    }
                    
                }
                else
                {
		      alert('Succesfully Imported Over ' + resp.items.length + ' Google Events. You may load them into the interface by clicking "Google Calendar" button');
                    for (var i = 0; i < resp.items.length; i++) 
                    {

                        var hold_array = new Array();
			   //alert();

                        //console.log('Description: ' + resp.items[i].summary);
                        //console.log('Location: ' + resp.items[i].location);
                        //console.log('Date: ' + resp.items[i].start.date);
                        //console.log('Date Time: ' + resp.items[i].start.dateTime);
			   if(resp.items[i].start!==undefined)
		  	   {
                        hold_array.push(resp.items[i].summary);
                        hold_array.push(resp.items[i].location);
                        hold_array.push(resp.items[i].start.date);
                        hold_array.push(resp.items[i].start.dateTime);
                        hold_array.push(resp.items[i].end.date);
                        hold_array.push(resp.items[i].end.dateTime);     
                        gcal_meetings_array.push(hold_array);
			   }
                        //console.log(gcal_meetings_array[i][0]);
                    }  
        //            hold = false; 

                }
            });

        });
  
    }

}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function days_In_Month(month,year) {
    
    return new Date(year, month, 0).getDate();
    
}
function process_meetings_array()
{


    found_gcal_meetings_array = new Array();
    console.log(gcal_meetings_array.length);
    var no_location_given = false;
//    var jsonString = '';
    var date = $( "#datepicker" ).datepicker('getDate');
    var currentDay = date.getDate();
    var currentMonth = date.getMonth()+1;
    var calender_date_undefined = false;
    if(currentMonth<10)
    {
       currentMonth = '0'+currentMonth;
    }
    var currentYear = date.getFullYear();
    var queryDate;
    
    for(var i = 0; i<gcal_meetings_array.length; i++)
    {
//        hold_array.push(resp.items[i].summary);[0]
//        hold_array.push(resp.items[i].location);[1]
//        hold_array.push(resp.items[i].start.date);[2]
//        hold_array.push(resp.items[i].start.dateTime);[3]
//        hold_array.push(resp.items[i].end.date);[4]
//        hold_array.push(resp.items[i].end.dateTime);[5]
        var r_date, returned_date;
//        console.log('At ' + (33) + '::' + gcal_meetings_array[33][3]);
//        console.log('At ' + (i) + '::');
        //console.log('Description: ' + gcal_meetings_array[i][0]);
        //console.log('Location: ' + gcal_meetings_array[i][1]);
        //console.log('Date: ' + gcal_meetings_array[i][2]);
        //console.log('Date Time: ' + gcal_meetings_array[i][3]);
        if(gcal_meetings_array[i][2]===undefined)
        {
            r_date = gcal_meetings_array[i][3];
//            returned_date = r_date;
        }
        else 
        {
            r_date = gcal_meetings_array[i][2];
//        returned_date = r_date.slice(0, r_date.indexOf("T"));
        }
        if(r_date ===undefined)
        {
            calender_date_undefined = true;
        }
        returned_date = r_date.slice(0, r_date.indexOf("T"));
        //console.log('1. Returned Date: ' + returned_date);
        
        var summary, startHours, startMins, endHours, endMins, location = '';

        for(var j = 0; j<7; j++)
        {
            queryDate = currentYear + "-" + currentMonth + "-" + (currentDay+j);
            //console.log('2. Query Date: ' + queryDate);
            if(returned_date===queryDate)
            {
                
                location = gcal_meetings_array[i][1];
                summary = gcal_meetings_array[i][0];
                if(location===undefined)
                {
                    location = 'undefined';
                    no_location_given = true;
                }
//                console.log('Location: ' + location);
                startHours = gcal_meetings_array[i][3];
                startHours = startHours.slice(startHours.indexOf("T")+1, startHours.length-12);
//                console.log('Start Hours: ' + startHours);
                startMins = gcal_meetings_array[i][3];
                startMins = startMins.slice(startMins.indexOf(":")+1, startMins.length-9);
//                    console.log('Start Mins: ' + startMins);
                endHours = gcal_meetings_array[i][5];
                endHours = endHours.slice(endHours.indexOf("T")+1, endHours.length-12);
//                    console.log('End Hours: ' + endHours);
                endMins = gcal_meetings_array[i][5];
                endMins = endMins.slice(endMins.indexOf(":")+1, endMins.length-9);
//                    console.log('End Mins: ' + endMins);
                var hold_array = new Array();
                hold_array.push(startHours+':'+startMins);
                hold_array.push(endHours+':'+endMins);
                hold_array.push(location);
                hold_array.push(j);
                hold_array.push(summary);
                found_gcal_meetings_array.push(hold_array);
//                console.log('Found day: ' + j);
//                console.log('On Date: ' + returned_date);
                
            }
//            jsonString = "{\"data\": ["+jsonString+"]}";
            
            
        }
//        console.log(jsonString);
//        meetings_jsonObject.push(eval("(" + jsonString + ")")); 
//        jsonString = '';
        
    }
    if(calender_date_undefined === true)
    {
        alert('One or more of your calender entries does not have a date defined!?');
    }
    if(no_location_given === true)
    {
        alert('One or more of your calender entries did not have a location defined. The meeting description has been used instead!');
    }    
    console.log(found_gcal_meetings_array.length);
//    jsonString  = jsonString + "[\""+startHours+":"+startMins+"\", \""+endHours+":"+endMins+"\", \""+location+"\"],";
    
}

function gcal_convert_meetings_to_json(day)
{
    
    var jsonString = '';
    var count = 0;
    for(var i = 0; i<found_gcal_meetings_array.length; i++)
    {
        
        if(found_gcal_meetings_array[i][3]===day)
        {
            
            jsonString  = jsonString + "[\""+found_gcal_meetings_array[i][0]+"\", \""+found_gcal_meetings_array[i][1]+"\", \""+found_gcal_meetings_array[i][2]+"\", \""+found_gcal_meetings_array[i][4]+"\"],";
            console.log(jsonString);
            count++;
        }

    
    }
    for(var i = count; i <7; i++)
    {
        jsonString = jsonString + "[\"\", \"\", \"\", \"\"],";
    }

    jsonString = "{\"data\": ["+jsonString+"]}";
    console.log(jsonString);
    return eval("(" + jsonString + ")");
}





//function makeApiCall() {
//  gapi.client.load('calendar', 'v3', function() {
//    var request = gapi.client.calendar.events.list({
//      'calendarId': 'primary'
//    });
//          
//    request.execute(function(resp) {
//      for (var i = 0; i < resp.items.length; i++) {
//        var li = document.createElement('li');
//        li.appendChild(document.createTextNode(resp.items[i].summary));
//        li.appendChild(document.createElement('br'));
//        li.appendChild(document.createTextNode('Location: ' + resp.items[i].location));
//        li.appendChild(document.createElement('br'));
//        li.appendChild(document.createTextNode('Start Date: ' + resp.items[i].start.date));
//        li.appendChild(document.createElement('br'));
//        li.appendChild(document.createTextNode('Start Time: ' + resp.items[i].start.dateTime));
//        li.appendChild(document.createElement('br'));
//        li.appendChild(document.createTextNode('End Date: ' + resp.items[i].end.date));
//        li.appendChild(document.createElement('br'));
//        li.appendChild(document.createTextNode('End Time: ' + resp.items[i].end.dateTime));
//        document.getElementById('events').appendChild(li);
//      }
//    });
//  });
//}


function createEventApiCall(appointmentName, location, startTime, endTime) {
  
    var resource = {
      "summary": appointmentName,
      "location": location,
      "start": {
        "dateTime": startTime
      },
      "end": {
        "dateTime": endTime
      }
    };

    gapi.client.load('calendar', 'v3', function() {
    	var request = gapi.client.calendar.events.insert({
      	'calendarId': 'primary',
      	'resource': resource
    });

    request.execute(function(resp) {
      console.log(resp);
    });
    });
}


//function getGoogleMeetings(day) {
//    
//    var date = $( "#datepicker" ).datepicker('getDate');
//    var currentDay = date.getDate();
//    var currentMonth = date.getMonth()+1;
//
//    if(currentMonth<10)
//    {
//       currentMonth = '0'+currentMonth;
//    }
//    var currentYear = date.getFullYear();
//    var queryDate;
//    queryDate = currentYear + "-" + currentMonth + "-" + (currentDay+day);
//    
//    console.log('Querying Google Calendar Date: ' + queryDate);
//    var jsonString ='';
//    gapi.auth.authorize(
//    {client_id: clientId, scope: scopes, immediate: false},
//    handleAuthResult);
//    gapi.client.load('calendar', 'v3', function() {
//        var request = gapi.client.calendar.events.list({
//          'calendarId': 'primary'
//        });
//          
//        request.execute(function(resp) {
//        
//        for (var i = 0; i < resp.items.length; i++) {
//
//            var r_date = resp.items[i].start.dateTime;
//            if(r_date===undefined)
//            {
//                   r_date = resp.items[i].start.date;
//            }
//            var returned_date = r_date.slice(0, r_date.indexOf("T"));
//
//
//
//            var startHours, startMins, endHours, endMins, location = '';
//
////            console.log('Query Date: ' + queryDate);
//            if(returned_date===queryDate)
//            {
////                console.log('Location: ' + location);
//                location = resp.items[i].location;
////                console.log('Description: ' + resp.items[i].summary);
////                console.log('Start Date: ' + resp.items[i].start.date);
////                console.log('Start Time: ' + resp.items[i].start.dateTime);
////                console.log('End Date: ' + resp.items[i].end.date);
////                console.log('End Time: ' + resp.items[i].end.dateTime);
//                startHours = resp.items[i].start.dateTime;
//                startHours = startHours.slice(startHours.indexOf("T")+1, startHours.length-12);
////                console.log('Start Hours: ' + startHours);
//                startMins = resp.items[i].start.dateTime;
//                startMins = startMins.slice(startMins.indexOf(":")+1, startMins.length-9);
////                console.log('Start Mins: ' + startMins);
//                endHours = resp.items[i].end.dateTime;
//                endHours = endHours.slice(endHours.indexOf("T")+1, endHours.length-12);
////                console.log('End Hours: ' + endHours);
//                endMins = resp.items[i].end.dateTime;
//                endMins = endMins.slice(endMins.indexOf(":")+1, endMins.length-9);
////                console.log('End Mins: ' + endMins);
//
//                jsonString  = jsonString + "[\""+startHours+":"+startMins+"\", \""+endHours+":"+endMins+"\", \""+location+"\"],";
//                console.log(jsonString);
//            }
//
//            }
//        });
//    });
//    
//    jsonString = "{\"data\": ["+jsonString+"]}";
//    console.log(jsonString);
//    meetings_jsonObject.push(eval("(" + jsonString + ")"));
//
//
//}

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('load_button_text_id');
  if (authResult) {
//    authorizeButton.style.visibility = 'hidden';
    //createEventApiCall('A Meeting','KDEG MEETING ROOM', '2014-05-16T10:25:00.000-07:00', '2014-05-16T10:25:00.000-07:00');
//    getGoogleMeetings();
    
  } else {
//    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
   }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}
function handleAuth() {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}
