var log_data_array = new Array();


function LogData(id, time, date, log_data){
    
    this.id = id;
//    this.time = time;
    this.date = date;
    this.log_data = log_data;
        
}

function logDataToString(logdata)
{
    console.log('Log ID: ' + logdata.id);
//    console.log('Log time: ' + logdata.time);
    console.log('Log date: ' + logdata.date);
    console.log('Log data: ' + logdata.log_data);
    console.log('-------------');
    console.log('-------------');
  
}

function update_log_div_content()
{
    query_log_data();
    var content = '';
    
    for(var i = 0; i < log_data_array.length; i++)
    {
        
        var d = new Date(Number(log_data_array[i].date));
//        content = content + 'Date: ' + d.toString() + '\n';
        content = content + '<h4>Log Entry: ' + (d.toUTCString()) + '</h4>';
//        content = content + '<p>';

//        content = content + '</p>';
        
        content = content + '<p>';
        content = content + log_data_array[i].log_data + '\n' + '\n';       
        content = content + '</p>';
        content = content + '<p>------------</p>';
        

        
        
    }
    
//    alert(content);
    document.getElementById('logdata_output_textarea').innerHTML = content;

    
}

function query_log_data(){

    console.log('CALLING query_log_data FUNCTION');
    console.log('Querying Ontology for Log Data');

    log_data_array = new Array();
    
    var log_data_id, log_data_time, log_data_date, log_data;
    log_data_id = undefined;
    log_data_time = undefined;
    log_data_date = undefined;
    log_data = undefined;

    
    var query = "SELECT ?date ?log_data "+
        "WHERE{"+
        "?datalog <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#DataLogging>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasTimeStamp> ?date."+
        "?datalog <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDataLog> ?log_data."+
        "}";

    console.log(query);  
    
    var result_object = sparql_query (query);
    
    if(result_object.results.bindings.length!==0)
    {

        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
//            log_data_id = result_object.results.bindings[i].id.value;
//            log_data_time = result_object.results.bindings[i].time.value;
            log_data_date = result_object.results.bindings[i].date.value;
            log_data = result_object.results.bindings[i].log_data.value;;

            var temp_log = new LogData(log_data_id, log_data_time, log_data_date, log_data);
            log_data_array.push(temp_log);

        }

        console.log('Log Entries in Ontology:' + log_data_array.length);

    }
    


}



function query_update_log_data(){

    var contenteditable = document.querySelector('[contenteditable]'),
    data = contenteditable.textContent;

    var date = new Date();

    console.log(date);
   
//    var query = "SELECT ?zone ?timeStamp "+
//        "WHERE{"+
//        "?zone  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#DataLogging>;"+
//        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasTimeStamp> ?timeStamp."+
//        "}";
//
//    console.log(query);
//    var result_object = sparql_query (query);
//       
//    if(result_object.results.bindings.length!=0)
//    {
//                r=confirm("Warning: A log entry for today already exists, do you wish to add another?");
//                if (r==true)
//                {
//
//                }//END OF IF
//                else
//                {
//                    return; //End function
//                }//END OF ELSE
//
//    }
    
    date = date.getTime();
    
    query = "DELETE WHERE{"+
    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#DataLogging"+date+">"+
    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasTimeStamp> ?date."+
    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#DataLogging"+date+">"+
    "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDataLog> ?data_log."+
    "}" 

    sparql_delete (query);
    var query = "";
    
    query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#DataLogging"+date+">"+
            "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#DataLogging>; "+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasTimeStamp> \"" + date +"\";"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasDataLog> \"" + data +"\";"+      
            "}";

    console.log(query);
    result_object = sparql_update (query);
    
    update_log_div_content();
    
//    console.log(JSON.stringify(result_object));


}//END OF FUNCTION