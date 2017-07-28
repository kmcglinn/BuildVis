/**
 * @author Kris McGlinn
 *
 */
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var time_interval_day = 0;
var time_interval_occupancy = 1;
var time_interval_occupancy_count = 0;
var occupancy_series = new Array();
//document.getElementById('day_div_id').innerHTML = time_interval_day;

//var main_office = new Array(14);
//
//temp_array = new Array('S13',1,1,1,1,1,1,0,1,1,1,0,0,0);
//main_office.push(temp_array);
//temp_array = new Array('S13',1,1,1,1,1,1,0,1,1,1,0,0,0);
//main_office.push(temp_array);
//temp_array = new Array('S13',1,1,1,1,1,1,0,1,1,1,0,0,0);
//main_office.push(temp_array);
//temp_array = new Array('S13',1,1,1,1,1,1,0,1,1,1,0,0,0);
//main_office.push(temp_array);
//temp_array = new Array('S13',1,1,1,1,1,1,0,1,1,1,0,0,0);
//main_office.push(temp_array);
//temp_array = new Array('S13',0,0,0,0,0,0,0,0,0,0,0,0);
//main_office.push(temp_array);
//temp_array = new Array('S13',0,0,0,0,0,0,0,0,0,0,0,0);
//main_office.push(temp_array);

var r02 = new Array(7);
var temp_array = new Array(25);

//mp_array = new Array('R02',1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3);
temp_array = new Array('R02',0,0,0,0,0,0,1,1,1,1,1,1,0,1,0,1,0,0,0,0,0,0,0);
r02[0] = temp_array;
temp_array = new Array('R02',0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0);
r02[1] = temp_array;
temp_array = new Array('R02',0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0);
r02[2] = temp_array;
temp_array = new Array('R02',0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0);
r02[3] = temp_array;
temp_array = new Array('R02',0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0);
r02[4] = temp_array;
temp_array = new Array('R02',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
r02[5] = temp_array;
temp_array = new Array('R02',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
r02[6] = temp_array;

var r06 = new Array();
//mp_array = new Array('R02',1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3);
temp_array = new Array('R06',0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0);
r06[0] = temp_array;
temp_array = new Array('R06',0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0);
r06[1] = temp_array;
temp_array = new Array('R06',0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0);
r06[2] = temp_array;
temp_array = new Array('R06',0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0);
r06[3] = temp_array;
temp_array = new Array('R06',0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0);
r06[4] = temp_array;
temp_array = new Array('R06',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
r06[5] = temp_array;
temp_array = new Array('R06',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
r06[6] = temp_array;

var r10 = new Array();
//mp_array = new Array('R02',1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3);
temp_array = new Array('R10',0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0);
r10[0] = temp_array;
temp_array = new Array('R10',0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0);
r10[1] = temp_array;
temp_array = new Array('R10',0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0);
r10[2] = temp_array;
temp_array = new Array('R10',0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0);
r10[3] = temp_array;
temp_array = new Array('R10',0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0);
r10[4] = temp_array;
temp_array = new Array('R10',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
r10[5] = temp_array;
temp_array = new Array('R10',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
r10[6] = temp_array;

var r12 = new Array();
//mp_array = new Array('R02',1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3);
temp_array = new Array('R12',0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0);
r12[0] = temp_array;
temp_array = new Array('R12',0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0);
r12[1] = temp_array;
temp_array = new Array('R12',0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0);
r12[2] = temp_array;
temp_array = new Array('R12',0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0);
r12[3] = temp_array;
temp_array = new Array('R12',0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0);
r12[4] = temp_array;
temp_array = new Array('R12',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
r12[5] = temp_array;
temp_array = new Array('R12',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
r12[6] = temp_array;

var s01 = new Array();
//mp_array = new Array('R02',1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3);
temp_array = new Array('S1',0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0);
s01[0] = temp_array;
temp_array = new Array('S1',0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0);
s01[1] = temp_array;
temp_array = new Array('S1',0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0);
s01[2] = temp_array;
temp_array = new Array('S1',0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0);
s01[3] = temp_array;
temp_array = new Array('S1',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s01[4] = temp_array;
temp_array = new Array('S1',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s01[5] = temp_array;
temp_array = new Array('S1',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s01[6] = temp_array;

var s05 = new Array();
//mp_array = new Array('R02',1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3);
temp_array = new Array('S5',0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s05[0] = temp_array;
temp_array = new Array('S5',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s05[1] = temp_array;
temp_array = new Array('S5',0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0);
s05[2] = temp_array;
temp_array = new Array('S5',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s05[3] = temp_array;
temp_array = new Array('S5',0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s05[4] = temp_array;
temp_array = new Array('S5',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s05[5] = temp_array;
temp_array = new Array('S5',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s05[6] = temp_array;

var s06 = new Array();
//mp_array = new Array('R02',1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3);
temp_array = new Array('S6',0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0);
s06[0] = temp_array;
temp_array = new Array('S6',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s06[1] = temp_array;
temp_array = new Array('S6',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s06[2] = temp_array;
temp_array = new Array('S6',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s06[3] = temp_array;
temp_array = new Array('S6',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s06[4] = temp_array;
temp_array = new Array('S6',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s06[5] = temp_array;
temp_array = new Array('S6',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s06[6] = temp_array;

var s07 = new Array();
//mp_array = new Array('R02',1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3);
temp_array = new Array('S7',0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0);
s07[0] = temp_array;
temp_array = new Array('S7',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s07[1] = temp_array;
temp_array = new Array('S7',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s07[2] = temp_array;
temp_array = new Array('S7',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s07[3] = temp_array;
temp_array = new Array('S7',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s07[4] = temp_array;
temp_array = new Array('S7',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s07[5] = temp_array;
temp_array = new Array('S7',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
s07[6] = temp_array;
//s07[0] = new Array('S07',0,0,0,1,0,0,0,1,1,0,0,0);
//s07[1] = new Array('S07',0,0,0,0,0,0,0,0,0,0,0,0);
//s07[2] = new Array('S07',0,0,0,0,0,0,0,0,0,0,0,0);
//s07[3] = new Array('S07',0,0,0,0,0,0,0,0,0,0,0,0);
//s07[4] = new Array('S07',0,0,0,0,0,0,0,0,0,0,0,0);
//s07[5] = new Array('S07',0,0,0,0,0,0,0,0,0,0,0,0);
//s07[6] = new Array('S07',0,0,0,0,0,0,0,0,0,0,0,0);

var occupancy_matrix_zone_array = new Array(1);

occupancy_matrix_zone_array[0] = r02;
occupancy_matrix_zone_array[1] = r06;
occupancy_matrix_zone_array[2] = r10;
occupancy_matrix_zone_array[3] = r12;
occupancy_matrix_zone_array[4] = s01;
occupancy_matrix_zone_array[5] = s05;
occupancy_matrix_zone_array[6] = s06;
occupancy_matrix_zone_array[7] = s07;



function update_occupancy_chart()
{
    temp_array = new Array('',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    var found = false;
    for(var j = 0;  j< occupancy_matrix_zone_array.length; j++)
    {
//        console.log(current_activity_zone.symbolic);
        if(current_activity_zone.symbolic===occupancy_matrix_zone_array[j][0][0]) //Check to see if symbolic name equal first place in array
        {
            
            create_highchart(occupancy_matrix_zone_array[j][time_interval_day]);
            found = true;
        }
        

    }
    
    if(!found)
    {
       create_highchart(temp_array); 
    }
}

function set_zone_occupied_time_interval()
{
//    console.log(time_interval_occupancy_count);
//    console.log(time_interval_occupancy);
    
    if(time_interval_occupancy_count<20) ///controls the speed of updates
    {
         time_interval_occupancy_count++;
    }
    else 
    {
        if(time_interval_day < 6)
        {
            
            
            if(time_interval_occupancy<24)
            {
                
                set_zone_occupied(time_interval_occupancy, time_interval_day);
                time_interval_occupancy++;
                document.getElementById('hour_div_id').innerHTML = time_interval_occupancy+":00";
                
            }
            else
            {
                
                time_interval_day++;
                update_occupancy_chart();
                document.getElementById('day_div_id').innerHTML = convert_number_to_day(time_interval_day);
                time_interval_occupancy = 1;
                

            }

            time_interval_occupancy_count = 0;
            document.getElementById('hour_div_id').innerHTML = time_interval_occupancy+":00";
            
        }
        else
        {
            
            time_interval_day=0;
            update_occupancy_chart();
            document.getElementById('day_div_id').innerHTML = convert_number_to_day(time_interval_day);
        }

    }
    

    
//    return time_interval_occupancy;
}

function set_zone_occupied(time_interval_occupancy, time_interval_day)
{
//    console.log(zone_activity_array.length);
//    console.log(occupancy_matrix_zone_array.length);
//    console.log(occupancy_matrix_zone_array[0].length);
//    console.log(occupancy_matrix_zone_array[0][0].length);
    
    for(var i = 0;  i< zone_activity_array.length; i++)
    {
        
        
        for(var j = 0;  j< occupancy_matrix_zone_array.length; j++)
        {
//            console.log(occupancy_matrix_zone_array.length);
//            console.log(occupancy_matrix_zone_array[0][0][0]);
//            for(var y = 0;  y< occupancy_matrix_zone_array[j].length; y++)
//            {
            if(zone_activity_array[i].symbolic===occupancy_matrix_zone_array[j][time_interval_day][0]) //Check to see if symbolic name equal first place in array
            {
//                    console.log(occupancy_matrix_zone_array[0][0][0]);
                if(occupancy_matrix_zone_array[j][time_interval_day][time_interval_occupancy] === 1) //check to see if the position in the area is equal to 1, if so set zone to occupied
                {
//                    console.log(j);
//                    console.log(time_interval_day);
//                    console.log(time_interval_occupancy);
//                    console.log("Setting zone " + zone_activity_array[i].symbolic + " occupied to " + zone_activity_array[i].occupied);
                    zone_activity_array[i].occupied=1;

                }
                else
                {
                    zone_activity_array[i].occupied=0;
//                    console.log("Setting zone " + zone_activity_array[i].symbolic + " occupied to " + zone_activity_array[i].occupied);
                }
            }
//            }
    
        
        }
       
    }
    
}

