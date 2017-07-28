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


var zone_id, zone_type, zone_volume_x1, zone_volume_y1, zone_volume_z1, zone_volume_x2, zone_volume_y2, zone_volume_z2, zone_symbolicz;


function sparql_load_zones(prompt){

    if(prompt===true){
        var r=confirm("Warning: If you click OK to load zones, all unsaved zones will be lost");
            
        if (r===false)
        {
            return;
        }//END OF IF
        else
        {
            //Continue with function
        }//END OF ELSE
    //    }
    }
    zone_activity_array = new Array(); //Reset Array of zones, and re-populate with those saved in ontology 
    current_activity_zone = new Zone('Activity', 0, 0,0,0,  0,0,0, "Office"); //Create an empty zone for the current zone
    zone_activity_array.push(current_activity_zone); //The first object in the array stores a reference to the (current) zone which is currently being drawn.
    var query = "SELECT ?zone_id ?zone_type ?zone_volume ?x1 ?y1 ?z1 ?x2 ?y2 ?z2 ?sym "+
        "WHERE{"+
        "?zone  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Zone>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?zone_id."+
        "?zone  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZoneType> ?zone_type."+
        "?zone  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasVolume> ?zone_volume."+
        "?zone  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?sym."+        
        "?zone_volume <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasX1Coord> ?x1."+
        "?zone_volume <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasY1Coord> ?y1."+
        "?zone_volume <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZ1Coord> ?z1."+
        "?zone_volume <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasX2Coord> ?x2."+
        "?zone_volume <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasY2Coord> ?y2."+
        "?zone_volume <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZ2Coord> ?z2."+
        "}";

//    alert(query); 
    console.log(query);
    
    var result_object = sparql_query (query);
//    alert(JSON.stringify(result_object));
    
    if(result_object.results.bindings.length!=0)
    {
        console.log('For Concept Zone: ');
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
            zone_id = result_object.results.bindings[i].zone_id.value;
            zone_type = result_object.results.bindings[i].zone_type.value;
            zone_x1 = result_object.results.bindings[i].x1.value;
            zone_y1 = result_object.results.bindings[i].y1.value;
            zone_z1 = result_object.results.bindings[i].z1.value;
            zone_x2 = result_object.results.bindings[i].x2.value;
            zone_y2 = result_object.results.bindings[i].y2.value;
            zone_z2 = result_object.results.bindings[i].z2.value;
            zone_symbolic = result_object.results.bindings[i].sym.value;
//            alert(zone_x1+"::"+zone_y1+"::"+zone_z1);
            
            var temp_zone = new Zone(zone_type, zone_id, zone_x1, zone_y1, zone_z1, zone_x2, zone_y2, zone_z2, zone_symbolic);
//            console.log(temp_zone.getInfo());
            zone_activity_array.push(temp_zone);
//            console.log(zone_activity_array[i].getInfo());
        }
    }
//    console.log('ZONES FOUND: ' + zone_activity_array.length);
    //update the text fields
    if(web_gl_on){
        console.log('update_room_tags() sparql_load_zones(prompt)');
        update_room_tags();
    }

}//END OF FUNCTION



function sparql_load_zones_pica()
{

   var query = "SELECT ?zone ?perimeter "+
        "WHERE{"+
        "?zone <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Zone>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPerimeter> ?perimeter."+
        "}";


    var result_object = sparql_query (query);
    console.log(query);
    var zone_x1, zone_y1, zone_x2, zone_y2, zone_symbolic, perimeter_string, perimeters;
    var m_y = zone_load_modifier_y;
    var m_x = zone_load_modifier_x;
    var m_d = zone_load_divisor;
    
    if(result_object.results.bindings.length!=0)
    {
        console.log('For Concept Zone: ');
        
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
            zone_symbolic = result_object.results.bindings[i].zone.value.replace('http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Floor','');
            zone_symbolic = zone_symbolic.substring(2, zone_symbolic.length);
            perimeter_string = result_object.results.bindings[i].perimeter.value;
            perimeters = perimeter_string.split(';');
            for(var j = 0; j < perimeters.length; j++)
            {
                perimeters[j] = perimeters[j].split(':');
//                console.log(perimeters[j][0]);
//                console.log(perimeters[j][1]);
            }
            zone_x1 = (Number(perimeters[0][1])+m_y)/m_d;
//                console.log((perimeters[0][1]/zone_load_divisor)+zone_load_modifier_y);
            zone_y1 = ((Number(perimeters[0][0])+m_x)*-1)/m_d;
            zone_x2 = (Number(perimeters[2][1])+m_y)/m_d;
            zone_y2 = ((Number(perimeters[2][0])+m_x)*-1)/m_d;
//            zone_x1 = ((Number(perimeters[0][0])+m_x)/m_d);
//            zone_y1 = ((Number(perimeters[0][1])+m_y)/m_d);
//            zone_x2 = ((Number(perimeters[2][0])+m_x)/m_d);
//            zone_y2 = ((Number(perimeters[2][1])+m_y)/m_d);


            var temp_zone = new Zone("Activity", zone_symbolic, zone_y1, zone_x1, 0, zone_y2, zone_x2, 0, zone_symbolic);

//            console.log(temp_zone.getInfo());
            zone_activity_array.push(temp_zone);
//            console.log(zone_activity_array[i+2].getInfo());
            
        }
    }

    console.log('Number of ZONES: ' + zone_activity_array.length);
    //update the text fields
    if(web_gl_on){
        console.log('update_room_tags() sparql_load_zones_new(prompt)');
//        sparql_load_zones(true);
        update_room_tags();
    }
}


function sparql_load_zones_new(prompt){

//    console.log("HERE!!!");
    if(prompt===true){
        var r=confirm("Warning: If you click OK to load zones, all unsaved zones will be lost");
            
        if (r===false)
        {
            return;
        }//END OF IF
        else
        {
            //Continue with function
        }//END OF ELSE
    }
    
    var query = "SELECT ?zone_name ?x_coord ?y_coord ?perimeter "+
        "WHERE{"+
        "?zone <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Zone>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasName> ?zone_name."+
        "?zone <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPerimeter> ?perimeter."+
        "?zone <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?sym."+
        "?sym <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> ?x_coord."+
        "?sym <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> ?y_coord."+
        
        "}";


    var result_object = sparql_query (query);
    console.log(query);
    var zone_x1, zone_y1, zone_x2, zone_y2, zone_symbolic, perimeter_string, perimeters;
    var divisor = 8;
    var modifier_x = -6;
    var modifier_y = 8;

    if(result_object.results.bindings.length!=0)
    {
        console.log('For Concept Zone: ');
        
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
//            var zone_id = result_object.results.bindings[i].zone_id.value;
//            console.log(zone_symbolic);
            zone_symbolic = result_object.results.bindings[i].zone_name.value;
//            console.log(zone_symbolic);
            perimeter_string = result_object.results.bindings[i].perimeter.value;
            perimeters = perimeter_string.split(';');
            for(var j = 0; j < perimeters.length; j++)
            {
                perimeters[j] = perimeters[j].split(':');
//                console.log(perimeters[j][0]);
//                console.log(perimeters[j][1]);
            }
            zone_y1 = ((perimeters[0][1]/divisor)+modifier_y);
            zone_x1 = ((perimeters[0][0]/divisor)+modifier_x);
            zone_y2 = ((perimeters[2][1]/divisor)+modifier_y);
            zone_x2 = ((perimeters[2][0]/divisor)+modifier_x);


            var temp_zone = new Zone("Activity", zone_symbolic, zone_y1, zone_x1, 0, zone_y2, zone_x2, 0, zone_symbolic);

//            console.log(temp_zone.getInfo());
            zone_activity_array.push(temp_zone);
//            console.log(zone_activity_array[i+2].getInfo());
            
        }
    }
     var query = "SELECT ?zone_name ?x_coord ?y_coord ?perimeter "+
        "WHERE{"+
        "?zone <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Room>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasName> ?zone_name."+
        "?zone <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPerimeter> ?perimeter."+
        "?zone <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?sym."+
        "?sym <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> ?x_coord."+
        "?sym <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> ?y_coord."+
        "}";


    var result_object = sparql_query (query);
    console.log(query);
    var zone_x1, zone_y1, zone_symbolic, perimeter_string, perimeters;
//    console.log("Test");
    if(result_object.results.bindings.length!=0)
    {
        console.log('For Concept Room: ');
        
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
//            zone_id = result_object.results.bindings[i].zone_id.value;
//            zone_type = result_object.results.bindings[i].zone_type.value;
//            console.log(result_object.results.bindings[i].y_coord.value);
            zone_x1 = (parseFloat(result_object.results.bindings[i].x_coord.value)-150)/20;
            zone_y1 = (parseFloat(result_object.results.bindings[i].y_coord.value)+300)/20;
            zone_symbolic = result_object.results.bindings[i].zone_name.value;
//            console.log(zone_symbolic);
            perimeter_string = result_object.results.bindings[i].perimeter.value;
            perimeters = perimeter_string.split(';');
            for(var j = 0; j < perimeters.length; j++)
            {
                perimeters[j] = perimeters[j].split(':');
            }
            if(current_building === 0)
            {
//                alert(buildings[current_building]);
                zone_x1 = ((perimeters[0][1]/zone_load_divisor)+zone_load_modifier_y);
//                console.log((perimeters[0][1]/zone_load_divisor)+zone_load_modifier_y);
                zone_y1 = ((perimeters[0][0]/zone_load_divisor)+zone_load_modifier_x)*-1;
                zone_x2 = ((perimeters[2][1]/zone_load_divisor)+zone_load_modifier_y);
                zone_y2 = ((perimeters[2][0]/zone_load_divisor)+zone_load_modifier_x)*-1;
            }
            if(current_building === 1)
            {
                zone_y1 = (perimeters[0][1]/zone_load_divisor)+zone_load_modifier_y;
                zone_x1 = (perimeters[0][0]/zone_load_divisor)+zone_load_modifier_x;
                zone_y2 = (perimeters[2][1]/zone_load_divisor)+zone_load_modifier_y;
                zone_x2 = (perimeters[2][0]/zone_load_divisor)+zone_load_modifier_x;
            }
            if(current_building === 2)
            {
                zone_y1 = (perimeters[0][1]/zone_load_divisor)+zone_load_modifier_y;
                zone_x1 = (perimeters[0][0]/zone_load_divisor)+zone_load_modifier_x;
                zone_y2 = (perimeters[2][1]/zone_load_divisor)+zone_load_modifier_y;
                zone_x2 = (perimeters[2][0]/zone_load_divisor)+zone_load_modifier_x;
            }
            if(current_building === 3)
            {
                zone_y1 = (perimeters[0][1]/zone_load_divisor)+zone_load_modifier_y;
                zone_x1 = (perimeters[0][0]/zone_load_divisor)+zone_load_modifier_x;
                zone_y2 = (perimeters[2][1]/zone_load_divisor)+zone_load_modifier_y;
                zone_x2 = (perimeters[2][0]/zone_load_divisor)+zone_load_modifier_x;
            }
            if(current_building === 4)
            {
                zone_x1 = ((perimeters[0][1]/zone_load_divisor)+zone_load_modifier_y);
                zone_y1 = ((perimeters[0][0]/zone_load_divisor)+zone_load_modifier_x)*-1;
                zone_x2 = ((perimeters[2][1]/zone_load_divisor)+zone_load_modifier_y);
                zone_y2 = ((perimeters[2][0]/zone_load_divisor)+zone_load_modifier_x)*-1;
            }

            var temp_zone = new Zone("Activity", zone_symbolic, zone_y1, zone_x1, 0, zone_y2, zone_x2, 0, zone_symbolic);
//            console.log(temp_zone.getInfo());
            zone_activity_array.push(temp_zone);
//            console.log(zone_activity_array[i+2].getInfo());
            
        }
    }
    
    var query = "SELECT ?zone_name ?x_coord ?y_coord ?perimeter "+
        "WHERE{"+
        "?zone <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#OfficeHall>;"+
//        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?zone_id."+
//        "?zone <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZoneType> ?zone_type."+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasName> ?zone_name."+
        "?zone <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPerimeter> ?perimeter."+
        "?zone <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?sym."+
        "?sym <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> ?x_coord."+
        "?sym <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> ?y_coord."+
        
//        "?zone_volume <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasX1Coord> ?x1."+
//        "?zone_volume <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasY1Coord> ?y1."+
//        "?zone_volume <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZ1Coord> ?z1."+
//        "?zone_volume <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasX2Coord> ?x2."+
//        "?zone_volume <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasY2Coord> ?y2."+
//        "?zone_volume <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZ2Coord> ?z2."+
        "}";


    var result_object = sparql_query (query);
    console.log(query);
    var zone_x1, zone_y1, zone_symbolic, perimeter_string, perimeters;
//    console.log("Test");
    if(result_object.results.bindings.length!=0)
    {
        console.log('For Concept OfficeHall: ');
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
//            zone_id = result_object.results.bindings[i].zone_id.value;
//            zone_type = result_object.results.bindings[i].zone_type.value;
//            console.log(result_object.results.bindings[i].y_coord.value);
            zone_x1 = (parseFloat(result_object.results.bindings[i].x_coord.value)-150)/20;
            zone_y1 = (parseFloat(result_object.results.bindings[i].y_coord.value)+300)/20;
            zone_symbolic = result_object.results.bindings[i].zone_name.value;
            perimeter_string = result_object.results.bindings[i].perimeter.value;
            perimeters = perimeter_string.split(';');
            for(var j = 0; j < perimeters.length; j++)
            {
                perimeters[j] = perimeters[j].split(':');
//                console.log(perimeters[j][0]);
//                console.log(perimeters[j][1]);
            }
            zone_y1 = (perimeters[0][1]/divisor)+modifier_y;
            zone_x1 = (perimeters[0][0]/divisor)+modifier_x;
            zone_y2 = (perimeters[2][1]/divisor)+modifier_y;
            zone_x2 = (perimeters[2][0]/divisor)+modifier_x;
//            console.log(perimeters.length);
//            var modifier = 2;
//            console.log(zone_x1-modifier);

            var temp_zone = new Zone("Activity", zone_symbolic, zone_y1, zone_x1, 0, zone_y2, zone_x2, 0, zone_symbolic);
            zone_activity_array.push(temp_zone);
//            console.log(temp_zone.getInfo());
            
        }
    }
    console.log('Number of ZONES: ' + zone_activity_array.length);
    //update the text fields
    if(web_gl_on){
        console.log('update_room_tags() sparql_load_zones_new(prompt)');
//        sparql_load_zones(true);
        update_room_tags();
    }
    
//    object_array_toString(zone_activity_array);

}//END OF FUNCTION

function object_array_toString(array)
{

    for(var i = 0; i<array.length; i++){
        
        console.log('ID: ' + array[i].id);
        console.log('Symbolic Name: ' + array[i].symbolic);
    }
}
function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}
function update_zone(zone){

    var query = "SELECT ?zone "+
        "WHERE{"+
        "?zone  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Zone"+zone.id+">;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?"+zone.id+"."+
        "?zone <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZoneType> \"" + zone.type +"\"."+
        "}";
    
    var result_object = sparql_query (query);
    
    console.log(JSON.stringify(result_object));
    
    if(result_object.results.bindings.length!=0)
    {
        
        r=confirm("Warning: A zone with this ID already exists, do you wish to overwrite it?");
        if (r==true)
        {


        }//END OF IF
        else
        {
            return; //End function
        }//END OF ELSE
        
    }
    

    query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Zone"+zone.id+">"+
            "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Zone>; "+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"" + zone.id +"\";"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZoneType> \"" + zone.type +"\";"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> \"" + zone.symbolic +"\";"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasVolume> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Volume" + zone.id +">;"+      
            "}";

    console.log(query);
    result_object = sparql_update (query);
    
    console.log(JSON.stringify(result_object));
    
    query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Volume"+zone.id+">"+
            "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Volume>; "+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"Volume" + zone.id +"\";"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasX1Coord> \"" + zone.p1X +"\";"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasY1Coord> \"" + zone.p1Y +"\";"+   
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZ1Coord> \"" + zone.p1Z +"\";"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasX2Coord> \"" + zone.p2X +"\";"+   
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasY2Coord> \"" + zone.p2Y +"\";"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZ2Coord> \"" + zone.p2Z +"\";"+   
            "}";

    console.log(query);
    result_object = sparql_update (query);
//    console.log(JSON.stringify(result_object));
    //PROBABLY NEED TO CHECK TO SEE WE ARE NOT DOUBLING UP ON VOLUME I.D.s!!!
//    query = "SELECT ?volume_id"+
//        "WHERE{"+
//        "?zone  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Volume>;"+
//        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?"+volume.id."+
//        "}";
//
//    //alert(query);  
//    
//    result_object = sparql_query (query);
//    
//    if(result_object.results.bindings.length!=0)
//    {
//        
//        r=confirm("Warning: A zone with this ID already exists, do you wish to overwrite it?");
//        if (r==true)
//        {
//
//
//        }//END OF IF
//        else
//        {
//            return; //End function
//        }//END OF ELSE
//        
//    }
    //update the text fields
    if(web_gl_on){
        console.log('update_room_tags() update_zone(zone)');
        update_room_tags();
    }

}//END OF FUNCTION

function delete_zone_sparql(zone_id){

    console.log("HERE!!!!"+zone_id);
    zone_id = document.forms["zone_form"]["zone_id_name"].value;
    var r=confirm("Warning: This will delete zone "+zone_id+" from the database");
    if (r===true)
    {
        

    }//END OF IF
    else
    {
        return; //End function
    }//END OF ELSE

    query = "DELETE WHERE{"+
        "?zone  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Zone>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+zone_id+"\"."+
       "}";  
    
    var result_object = sparql_update (query);
    console.log(query);
    console.log(JSON.stringify(result_object));
    
    query = "DELETE WHERE{"+
        "?zone  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Volume>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"Volume"+zone_id+"\"."+
    "}";

    result_object = sparql_update (query);
    console.log(query);

    query = "DELETE WHERE{"+
        "?zone  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Zone>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasName> \""+zone_id+"\"."+
       "}";  
    
    result_object = sparql_update (query);
    console.log(query);
    
    //update the text fields
    if(web_gl_on){
        console.log('update_room_tags() delete_zone_sparql(prompt)');
        update_room_tags();
    }

}//END OF FUNCTION



function sparql_load_all_rooms(){

    var room_activity_array = new Array(); //Reset Array of zones, and re-populate with those saved in ontology 
//    var room_activity_zone = new Zone('Activity', 0, 0,0,0,  0,0,0, "Office"); //Create an empty zone for the current zone
//    zone_activity_array.push(current_activity_zone); //The first object in the array stores a reference to the (current) zone which is currently being drawn.
    var query = "SELECT ?zone_id ?zone_type ?zone_volume ?x1 ?y1 ?z1 ?x2 ?y2 ?z2 ?sym "+
        "WHERE{"+
        "?zone  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSymbolicPlacement> ?sym."+
        "}";

//    alert(query);  
    
    var result_object = sparql_query (query);
//    alert(JSON.stringify(result_object));
    var zone_symbolic;
    if(result_object.results.bindings.length!=0)
    {

        for(var i = 0; i<result_object.results.bindings.length; i++)
        {

            zone_symbolic = result_object.results.bindings[i].sym.value;
            console.log(zone_symbolic);
            

            room_activity_array.push(zone_symbolic);
            
        }
    }
    
    return room_activity_array;

}//END OF FUNCTION


