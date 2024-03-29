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

//var end_point = "http://phaedrus.scss.tcd.ie/fuseki/ds/query"; //End point for queris
//var end_point_update = "http://phaedrus.scss.tcd.ie/fuseki/ds/update"; //End point for updates
//var end_point = "http://kdeg-vm-46.scss.tcd.ie:3031/ds/query";
//var end_point_update = "http://kdeg-vm-46.scss.tcd.ie:3031/ds/update"; //End point for updates

//var end_point = "http://localhost:3030/ds/query";
//var end_point_update = "http://localhost:3030/ds/update"; 

//var end_point = "http://localhost:8080/ds/query";
//var end_point_update = "http://localhost:8080/ds/update"; 



//var end_point = "http://192.168.56.1:3030/ds/query";
//var end_point_update = "http://192.168.56.1:3030/ds/update"; 

//var end_point = "http://localhost:3030/ds/query";
function sparql_query (query_str) {
    
    var d = new Date();
    g_query_result_string = undefined;
//    console.log (query_str);
    var querypart = "query=" + escape (query_str); // escape makes the string ASCII-portable
    var xmlhttp = new XMLHttpRequest (); // ajax
    xmlhttp.open ('POST', sparql_end_point, false); // GET can have caching probs, so POST. NOT ASYNCHRONOUS - WAIT
    // probably need these headers
    xmlhttp.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.setRequestHeader ("Accept", "application/sparql-results+json");
    // Set up callback to get the response asynchronously.
    xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                            // results are in a string in xmlhttp.responseText but we can't return it from this sub-function
                            //console.log (xmlhttp.responseText);
//                            log_data = log_data + d.getTime() + xmlhttp.responseText;
                    } else {
                            // Some kind of error occurred.
                            alert("Sparql query error: " + xmlhttp.status + " " + xmlhttp.responseText);
//                            log_data = log_data + d.getTime() + xmlhttp.responseText;
                    }
            }
    }
    // Send the query to the endpoint.
    xmlhttp.send (querypart);
    // here we have the query result in a string, let's convert it to json, then return a JS object
//    log_data = log_data + d.getTime() + xmlhttp.responseText;
    return result_json = eval("(" + xmlhttp.responseText + ")");
}


function sparql_update (query_str) {

    var d = new Date();
    g_query_result_string = undefined;
//    console.log (query_str);
    var querypart = "update=" + escape (query_str); // escape makes the string ASCII-portable
    //alert(querypart);	

    var xmlhttp = new XMLHttpRequest (); // ajax

    xmlhttp.open ('POST', sparql_end_point_update, false); // GET can have caching probs, so POST. NOT ASYNCHRONOUS - WAIT

    // probably need these headers
    xmlhttp.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.setRequestHeader ("Accept", "application/sparql-results+json");

    // Set up callback to get the response asynchronously.
    xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                            // results are in a string in xmlhttp.responseText but we can't return it from this sub-function
                            //console.log (xmlhttp.responseText);
                            //alert(xmlhttp.responseText);
//                            log_data = log_data + d.getTime() + xmlhttp.responseText;
                    } else {
                            // Some kind of error occurred.
                            alert("Sparql query error: " + xmlhttp.status + " " + xmlhttp.responseText);
//                            log_data = log_data + d.getTime() + xmlhttp.responseText;
                    }
            }
    }
    // Send the query to the endpoint.
    xmlhttp.send (querypart);
//    log_data = log_data + d.getTime() + xmlhttp.responseText;
    // here we have the query result in a string, let's convert it to json, then return a JS object
    //return result_json = eval("(" + xmlhttp.responseText + ")");
}

function sparql_delete (query_str) {

    var d = new Date();
    g_query_result_string = undefined;
    //console.log (query_str);
    var querypart = "update=" + escape (query_str); // escape makes the string ASCII-portable
    //alert(querypart);	

    var xmlhttp = new XMLHttpRequest (); // ajax

    xmlhttp.open ('POST', sparql_end_point_update, false); // GET can have caching probs, so POST. NOT ASYNCHRONOUS - WAIT

    // probably need these headers
    xmlhttp.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.setRequestHeader ("Accept", "application/sparql-results+json");

    // Set up callback to get the response asynchronously.
    xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                            // results are in a string in xmlhttp.responseText but we can't return it from this sub-function
                            //console.log (xmlhttp.responseText);
//                            log_data = log_data + d.getTime() + xmlhttp.responseText;
                    } else {
                            // Some kind of error occurred.
                            alert("Sparql query error: " + xmlhttp.status + " " + xmlhttp.responseText);
//                            log_data = log_data + d.getTime() + xmlhttp.responseText;
                    }
            }
    }
    // Send the query to the endpoint.
    xmlhttp.send (querypart);
//    log_data = log_data + d.getTime() + xmlhttp.responseText;
    // here we have the query result in a string, let's convert it to json, then return a JS object
    //return result_json = eval("(" + xmlhttp.responseText + ")");
}

