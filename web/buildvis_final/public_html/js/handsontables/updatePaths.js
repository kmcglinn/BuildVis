/**
 * @author Kris McGlinn
 *
 */
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var path_zone_array = new Array();
var full_path_zone_array = new Array();
var global_zone_path_array = new Array();

function create_zone_path_for_table()
{
    console.log('creating zone paths for table...');
    var path_size = 0;
    
    global_zone_path_array = new Array();
    
    for(var i = 0; i<zone_activity_array.length; i++)
    {
//        console.log(zone_activity_array.type);
//        var temp_zone = new Zone(zone_type, zone_id, zone_x1, zone_y1, zone_z1, zone_x2, zone_y2, zone_z2, zone_symbolic);
        if(zone_activity_array[i].type==="Path")
        {
            
            path_zone_array.push(zone_activity_array[i].symbolic);
//            console.log(path_zone_array[path_size]);
            path_size++;
            
        }
        
    }
//    console.log(path_zone_array.toString());
//    path_zone_array = ["a", "b", "c", "d"];
    global_zone_path_array = permute(path_zone_array);
    sparql_save_zone_path(global_zone_path_array);
//    permutation_arrays_toString(global_zone_path_array);
//    console.log(global_zone_path_array.length);
    sparql_load_path_zones();

}

var permArr = [],
usedStrings = [];

//function permutation_arrays_toString(array)
//{
//    
//    for(var i = 0; i < array.length; i++)
//    {
//
//        console.log(array[i].toString());
//
//    }
//    
//}

function permutation_arrays_toString(array)
{
    
    day_start_path_entry = new Array();
    
    for(var i = 0; i < array.length; i++)
    {

//        console.log(array[i].join('-'));
        day_start_path_entry.push(array[i].join('-'));

    }
    
    console.log(day_start_path_entry.toString());
    
}

function permute(input) 
{
    
    var i, st;

    
    for (i = 0; i < input.length; i++) 
    {
        
        st = input.splice(i, 1)[0];
//        console.log(st);
        usedStrings.push(st);
//        console.log("Test: " + usedStrings.slice().toString());
        permArr.push(usedStrings.slice());
        
//        console.log("Test: " + permArr[0].toString());
        //If you only want permutations of array size
//        if (input.length === 0) 
//        {
//            
//            permArr.push(usedStrings.slice());
//            
//        }
        
        permute(input);
        input.splice(i, 0, st);
        usedStrings.pop();
        
    }
    return permArr;
    
}


