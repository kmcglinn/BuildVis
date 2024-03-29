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

function copy_2d_array(array){
    
    var new_array = new Array();
    
    for(var i = 0; i < array.length; i++)
    {
    
        new_array.push(array[i].slice);
    
    }
    
    return new_array;
}

function copy(arr)
{
    var new_arr = arr.slice(0);
    for(var i = new_arr.length; i--;)
        if(new_arr[i] instanceof Array)
            new_arr[i] = copy(new_arr[i]);
    return new_arr;
}

function sparql_save_zone_path(global_zone_path_array){
    
    
    
    console.log('updating path zones in fuseki database using SPARQL query...');
    var array = new Array(); //use this to copy the global_zone_path_array
    array = copy(global_zone_path_array);
    
    var placement = [0,0,0];
    var id, next_path, activity_zone; 
    
    for(var i = 0; i < array.length; i++)
    {
//        console.log('Input: ' + i + '----');
//        console.log('--------------------');
        if(array[i].length>1)
        {
            
//            array = new Array();
            array = copy(global_zone_path_array);
            
//            console.log(array[i].length);
            id = 'Start' + array[i].splice(0, array[i].length).join('');
            
            
//            array = new Array();
            array = copy(global_zone_path_array);
            next_path = array[i].splice(1, array[i].length).join('');
            
//            console.log(array[i].length);
//            console.log(array[i].splice(0, 1).join(''));
            array = copy(global_zone_path_array);
            activity_zone = array[i].splice(0, 1).join('');

            query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode"+id+">"+
                "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>; "+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isStartPath>\"true\"; "+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityZone> \"" + activity_zone +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"" + id +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode" + next_path +">;"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement" + activity_zone +">;"+      
                "}";

//            console.log(query);
            result_object = sparql_update (query);

            query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement"+ activity_zone +">"+
                "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement>; "+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"Placement" + activity_zone +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> \"" + placement[0] +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> \"" + placement[1] +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> \"" + placement[2] +"\";" + 
                "}";

//            console.log(query);
            result_object = sparql_update (query);

//            array = new Array();
            array = copy(global_zone_path_array);
//            console.log(global_zone_path_array[i].length);
            
            
            for(var j = 1; j<global_zone_path_array[i].length-1; j++)
            {
        //        console.log(current_path_node_array.length);
                array = copy(global_zone_path_array);
                id = array[i].splice(j, array[i].length).join('');
                
                array = copy(global_zone_path_array);
                activity_zone = array[i].splice(j, 1).join('');

                query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode"+id+">"+
                    "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>; "+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"" + id +"\";"+    
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityZone> \"" + activity_zone +"\";"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode" + array[i].splice(j+1, global_zone_path_array[i].length) +">;"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement" + activity_zone +">;"+      
                    "}";

//                console.log(query);
                result_object = sparql_update (query);

                query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement"+activity_zone+">"+
                    "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement>; "+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"Placement" + activity_zone +"\";"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> \"" + placement[0] +"\";"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> \"" + placement[1] +"\";"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> \"" + placement[2] +"\";" + 
                    "}";

//                console.log(query);
                result_object = sparql_update (query);


        //        console.log(JSON.stringify(result_object));
            }

            array = copy(global_zone_path_array);
            id = array[i].splice(j, array[i].length).join('');

            query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode"+id+">"+
                "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>; "+ 
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityZone> \"" + id +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isEndPath>\"true\"; "+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"" + id +"\";"+        
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathEnd>;"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement" + id +">;"+      
                "}";

            console.log(query);
            result_object = sparql_update (query);

            query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement"+id+">"+
                "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement>; "+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"Placement" + id +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> \"" + placement[0] +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> \"" + placement[1] +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> \"" + placement[2] +"\";" + 
                "}";

//            console.log(query);
            result_object = sparql_update (query);

        }
        else 
        {
//            array = copy(global_zone_path_array); Array has already been copied at begining of function
            id = array[i].splice(0, array[i].length);

            query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode"+id+">"+
                "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>; "+ 
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityZone> \"" + id +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isStartPath>\"true\"; "+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isEndPath>\"true\"; "+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"" + id +"\";"+        
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathEnd>;"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement" + id +">;"+      
                "}";

//            console.log(query);
            result_object = sparql_update (query);

            query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement"+id+">"+
                "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement>; "+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"Placement" + id +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> \"" + placement[0] +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> \"" + placement[1] +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> \"" + placement[2] +"\";" + 
                "}";

//            console.log(query);
            result_object = sparql_update (query);
        
        }
            
    }
    


//    console.log(JSON.stringify(result_object));
    
}


function sparql_save_path(){
    
    console.log(current_path_node_array.length);
    
    query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode"+current_path_node_array[0].path_id+">"+
        "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>; "+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isStartPath>\"true\"; "+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityZone> \"" + path_entry_id +"\";"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"" + current_path_node_array[0].path_id +"\";"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode" + current_path_node_array[1].path_id +">;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement" + current_path_node_array[0].path_id +">;"+      
        "}";

    console.log(query);
    result_object = sparql_update (query);

    query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement"+current_path_node_array[0].path_id+">"+
        "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement>; "+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"Placement" + current_path_node_array[0].path_id +"\";"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> \"" + current_path_node_array[0].p1X +"\";"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> \"" + current_path_node_array[0].p1Y +"\";"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> \"" + current_path_node_array[0].p1Z +"\";" + 
        "}";

//    console.log(query);
    result_object = sparql_update (query);


//    console.log(JSON.stringify(result_object));
    
    for(var i = 1; i<current_path_node_array.length-1; i++){
//        console.log(current_path_node_array.length);
        query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode"+current_path_node_array[i].path_id+">"+
            "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>; "+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"" + current_path_node_array[i].path_id +"\";"+    
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityZone> \"" + current_path_node_array[i].activity_zone_id +"\";"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode" + current_path_node_array[i+1].path_id +">;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement" + current_path_node_array[i].path_id +">;"+      
            "}";

        console.log(query);
        result_object = sparql_update (query);

        query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement"+current_path_node_array[i].path_id+">"+
            "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement>; "+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"Placement" + current_path_node_array[i].path_id +"\";"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> \"" + current_path_node_array[i].p1X +"\";"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> \"" + current_path_node_array[i].p1Y +"\";"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> \"" + current_path_node_array[i].p1Z +"\";" + 
            "}";

//        console.log(query);
        result_object = sparql_update (query);
        

//        console.log(JSON.stringify(result_object));
    }
    
    query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode"+current_path_node_array[current_path_node_array.length-1].path_id+">"+
        "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>; "+ 
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityZone> \"" + path_exit_id +"\";"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isEndPath>\"true\"; "+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"" + current_path_node_array[current_path_node_array.length-1].path_id +"\";"+        
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathEnd>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement" + current_path_node_array[current_path_node_array.length-1].path_id +">;"+      
        "}";

    console.log(query);
    result_object = sparql_update (query);

    query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement"+current_path_node_array[current_path_node_array.length-1].path_id+">"+
        "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Placement>; "+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"Placement" + current_path_node_array[current_path_node_array.length-1].path_id +"\";"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> \"" + current_path_node_array[current_path_node_array.length-1].p1X +"\";"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> \"" + current_path_node_array[current_path_node_array.length-1].p1Y +"\";"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> \"" + current_path_node_array[current_path_node_array.length-1].p1Z +"\";"+   
        "}";

//    console.log(query);
    result_object = sparql_update (query);

//    console.log(JSON.stringify(result_object));
    
}

function sparql_load_path_zones()
{

    var bool = true;
    var path_zone_array = new Array();
    var path_zone = new PathNode();
    var first_path_zone = new PathNode();
    var next_path_id;
    //current_path_node = new PathNode();
    
    var query = "SELECT ?path_id ?x1 ?y1 ?z1 ?hasNextPath ?next_path_id ?activity_zone_id"+
        " WHERE{"+
        "?path <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?path_id."+
        "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isStartPath>  \"true\"."+
        "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityZone> ?activity_zone_id."+
        "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?hasNextPath."+
        "?hasNextPath <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?next_path_id."+
        "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placement."+
        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> ?x1."+
        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> ?y1."+
        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> ?z1."+
        "}";

    var result_object = sparql_query (query);
    console.log(query);
    console.log("NUMBER OF PATH ZONES IN ONTOLOGY: " + result_object.results.bindings.length);
    var count = 0;
    
    if(result_object.results.bindings.length!==0)
    {
    
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
            
            path_zone = new PathNode();
            path_zone.path_id = result_object.results.bindings[i].path_id.value;
            path_zone.p1X = result_object.results.bindings[i].x1.value;
            path_zone.p1Y = result_object.results.bindings[i].y1.value;
            path_zone.p1Z = result_object.results.bindings[i].z1.value;
            path_zone.activity_zone_id = result_object.results.bindings[i].activity_zone_id.value;
            console.log("PUSHING START ZONE ONTO CURRENT ZONE ARRAY");
            path_zone_array.push(path_zone);
            count++;
            next_path_id = result_object.results.bindings[i].next_path_id.value;
            
            if(next_path_id==="pathEnd"){
                
                bool = false;           
                
            }
            
            while(bool)
            {              
              
                query = "SELECT ?x1 ?y1 ?z1 ?hasNextPath ?next_path_id ?activity_zone_id ?is_end_path"+
                    " WHERE{"+
                    "?path  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>;"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+next_path_id+"\"."+
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?hasNextPath."+
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityZone> ?activity_zone_id."+
//                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isEndPath> ?is_end_path."+
                    "?hasNextPath <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?next_path_id."+
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placement."+
                    "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> ?x1."+
                    "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> ?y1."+
                    "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> ?z1."+
                    "}";
                var result_object_2 = sparql_query (query);
                console.log(query);
//                console.log(result_object_2.results.bindings.length);
                path_zone = new PathNode();
                path_zone.path_id = next_path_id;
                path_zone.p1X = result_object_2.results.bindings[0].x1.value;
                path_zone.p1Y = result_object_2.results.bindings[0].y1.value;
                path_zone.p1Z = result_object_2.results.bindings[0].z1.value;
                path_zone.activity_zone_id = result_object_2.results.bindings[0].activity_zone_id.value;
                console.log("PUSHING NEXT PATH ZONE ONTO CURRENT PATH ZONE ARRAY");
                count++;
                path_zone_array.push(path_zone);
                next_path_id = result_object_2.results.bindings[0].next_path_id.value;
                console.log("NEXT PATH ID: "+ next_path_id);
                if(next_path_id==="pathEnd"){

                    bool = false;           

                }
//                if(result_object_2.results.bindings[0].is_end_path.value!==undefined){
//                    if(result_object_2.results.bindings[0].is_end_path.value==="true"){
//                        alert("True");
//                        bool = false;          
//                    }
//
//                }
            }

            if(current_path_node.length!==0)
            {
                console.log("PUSHING CURRENT PATH ZONE ARRAY TO PATH ZONE ARRAY");
                console.log("NUMBER OF PATH ZONES IN CURRENT PATH: " + count); 
                path_zone_array.push(path_zone);
                current_path_node = new PathNode();
                current_path_node_array = new Array();
                bool = true;
                count = 0;
            }
            
        }
        
//        console.log(path_node_array.length);
//        console.log(path_node_array[path_node_array.length-1].length);
//        console.log(path_node_array[path_node_array.length-1][path_node_array[path_node_array.length-1].length-1].id);
//        console.log(path_node_array[path_node_array.length-1][0].id);
    }
    //Throwing in this code to make sure everything is reset (Needs to be cleaned up!!!)


    
}

function sparql_load_path(prompt){

    if(prompt===true)
    {
        var r=confirm("Warning: If you click OK to load paths, all unsaved paths will be lost");
        if (r===false)
        {
            return;
        }//END OF IF
    }

    var bool = true;
    path_node_array = new Array();
    first_path_node = new PathNode();
    var next_path_id;
    //current_path_node = new PathNode();
    
    var query = "SELECT ?path_id ?x1 ?y1 ?z1 ?hasNextPath ?next_path_id ?activity_zone_id"+
        " WHERE{"+
        "?path <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?path_id."+
        "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isStartPath>  \"true\"."+
        "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityZone> ?activity_zone_id."+
        "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?hasNextPath."+
        "?hasNextPath <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?next_path_id."+
        "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placement."+
        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> ?x1."+
        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> ?y1."+
        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> ?z1."+
        "}";
    var result_object = sparql_query (query);
    console.log(query);
    console.log("NUMBER OF START NODES IN ONTOLOGY: " + result_object.results.bindings.length);
    var count = 0;
    if(result_object.results.bindings.length!==0)
    {
    
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
            current_path_node = new PathNode();
            current_path_node.path_id = result_object.results.bindings[i].path_id.value;
            current_path_node.p1X = result_object.results.bindings[i].x1.value;
            current_path_node.p1Y = result_object.results.bindings[i].y1.value;
            current_path_node.p1Z = result_object.results.bindings[i].z1.value;
            current_path_node.activity_zone_id = result_object.results.bindings[i].activity_zone_id.value;
            console.log("PUSHING START PATH NODE ONTO CURRENT PATH NODE ARRAY");
            current_path_node_array.push(current_path_node);
            count++;
            next_path_id = result_object.results.bindings[i].next_path_id.value;
            
            if(next_path_id==="pathEnd"){
                
                bool = false;           
                
            }
            
            while(bool)
            {              
              
                query = "SELECT ?x1 ?y1 ?z1 ?hasNextPath ?next_path_id ?activity_zone_id ?is_end_path"+
                    " WHERE{"+
                    "?path  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>;"+
                    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+next_path_id+"\"."+
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?hasNextPath."+
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasActivityZone> ?activity_zone_id."+
//                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isEndPath> ?is_end_path."+
                    "?hasNextPath <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?next_path_id."+
                    "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placement."+
                    "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> ?x1."+
                    "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> ?y1."+
                    "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> ?z1."+
                    "}";
                var result_object_2 = sparql_query (query);
                console.log(query);
//                console.log(result_object_2.results.bindings.length);
                current_path_node = new PathNode();
                current_path_node.path_id = next_path_id;
                current_path_node.p1X = result_object_2.results.bindings[0].x1.value;
                current_path_node.p1Y = result_object_2.results.bindings[0].y1.value;
                current_path_node.p1Z = result_object_2.results.bindings[0].z1.value;
                current_path_node.activity_zone_id = result_object_2.results.bindings[0].activity_zone_id.value;
                console.log("PUSHING NEXT PATH NODE ONTO CURRENT PATH NODE ARRAY");
                count++;
                current_path_node_array.push(current_path_node);
                next_path_id = result_object_2.results.bindings[0].next_path_id.value;
                console.log("NEXT PATH ID: "+ next_path_id);
                if(next_path_id==="pathEnd"){

                    bool = false;           

                }
//                if(result_object_2.results.bindings[0].is_end_path.value!==undefined){
//                    if(result_object_2.results.bindings[0].is_end_path.value==="true"){
//                        alert("True");
//                        bool = false;          
//                    }
//
//                }
            }

            if(current_path_node_array.length!==0)
            {
                console.log("PUSHING CURRENT PATH NODE ARRAY TO PATH NODE ARRAY");
                console.log("NUMBER OF NODES IN CURRENT PATH: " + count); 
                path_node_array.push(current_path_node_array);
                current_path_node = new PathNode();
                current_path_node_array = new Array();
                bool = true;
                count = 0;
            }
            
        }
        
//        console.log(path_node_array.length);
//        console.log(path_node_array[path_node_array.length-1].length);
//        console.log(path_node_array[path_node_array.length-1][path_node_array[path_node_array.length-1].length-1].id);
//        console.log(path_node_array[path_node_array.length-1][0].id);
    }
    //Throwing in this code to make sure everything is reset (Needs to be cleaned up!!!)
    console.log("RESETING PATHS NODE ARRAYS");
    can_create_zone = false; //This must be set to true to draw a new zone.
    can_select = false;
    //_zone = false; //This is set when 
//    can_select_path = false;
    can_create_path = false; //This is set to true when a zone has been selected and the key (c) has been pressed
    zone_selected = false; //this is set to true when a zone has been selected (pressing xand clicking)
    path_selected = false;
    path_connected = false; //this is set when a path is being created and the mouse goes over an existing path so that it selects the zones origin.
    can_save_path = false; //this is set when the path is connected to a zone also that you san save the path
    can_view_path_id = false; //This is so that the current path id div is displayed on the page. 
    entrance_set = false;
    exit_set = false;
    set_start_path_id = false;
    g_zone_is_being_built = false; //
    current_path_node_array = new Array();
    first_path_node = new PathNode();
    current_path_node = new PathNode();
    //currentlyPressedKeys[67] = false;
//    sparql_load_zones_new(true);
//    update_room_tags();

    if(web_gl_on)
    {
        console.log('update_room_tags() sparql_load_path(prompt)');
        update_room_tags();
    }
}
/*Have to consider
 * how all the activities, user id's, etc. are connected!!!
 * 
 */
function sparql_query_start_path_activity(){
    
    var query = "SELECT ?path_id ?x1 ?y1 ?z1 ?hasNextPath ?next_path_id"+
        " WHERE{"+
        "?path <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#Zone>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+path_id+"\"."+
        "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isStartPath>  \"true\"."+
        "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?hasNextPath."+
        "?hasNextPath <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?next_path_id."+
//        "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placement."+
//        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> ?x1."+
//        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> ?y1."+
//        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> ?z1."+
        "}";
    var result_object = sparql_query (query);
    console.log(query);
    var next_path_id = result_object.results.bin
    
}

function sparql_delete_path(){

    var r=confirm("Warning: This will delete this path from the database");

    if (r===false)
    {
        return; //End function
    }//END OF IF
    
    var path_id = document.getElementById("path_id_form").value;// Not a great way to do this! current_path_node_array[0].path_id;
    
    var query = "SELECT ?path_id ?x1 ?y1 ?z1 ?hasNextPath ?next_path_id"+
        " WHERE{"+
        "?path <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+path_id+"\"."+
        "?path  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isStartPath>  \"true\"."+
        "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?hasNextPath."+
        "?hasNextPath <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?next_path_id."+
//        "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placement."+
//        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> ?x1."+
//        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> ?y1."+
//        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> ?z1."+
        "}";
    var result_object = sparql_query (query);
    console.log(query);
    var next_path_id = result_object.results.bindings[0].next_path_id.value;
    query = "DELETE WHERE{"+
        "?path  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+path_id+"\"."+
       "}";
    result_object = sparql_update (query);
    console.log(JSON.stringify(result_object));
    while(next_path_id!=="pathEnd")
    {   
   
       var query = "SELECT ?path_id ?x1 ?y1 ?z1 ?hasNextPath ?next_path_id"+
        " WHERE{"+
        "?path <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+next_path_id+"\"."+
        "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasNextPath> ?hasNextPath."+
        "?hasNextPath <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?next_path_id."+
//        "?path <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasPlacement> ?placement."+
//        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasXCoord> ?x1."+
//        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasYCoord> ?y1."+
//        "?placement <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasZCoord> ?z1."+
        "}";
        result_object = sparql_query (query);
        console.log(query);
     
        query = "DELETE WHERE{"+
            "?path  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>;"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+next_path_id+"\"."+
           "}";
        next_path_id = result_object.results.bindings[0].next_path_id.value;
        result_object = sparql_update (query);
        console.log(JSON.stringify(result_object));

    }
    
    sparql_load_path(false);
    sparql_load_path(false);

}//END OF FUNCTION


function sparql_delete_all_path_zones(){
   
    query = "DELETE WHERE{"+
        "?path  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#PathNode>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \""+next_path_id+"\"."+
       "}";
    next_path_id = result_object.results.bindings[0].next_path_id.value;
    result_object = sparql_update (query);
    console.log(JSON.stringify(result_object));


}//END OF FUNCTION