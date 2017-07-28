var sensor_array = new Array();
var sensor_types = new MiniSet();
//var sensors = new Array();

function Sensor(id, type, value, zone_id, p1X, p1Y, p1Z){
    
    this.type = type;
    this.id = id;
    this.p1X = p1X;
    this.p1Y = p1Y;
    this.p1Z = p1Z;
    this.value = value;
    this.zone_id = zone_id;
        
}

function sensorToString(sensor)
{
    console.log('Sensor Type: ' + sensor.type);
    console.log('Sensor ID: ' + sensor.id);
    console.log('Sensor Zone_ID: ' + sensor.zone_id);
    console.log('Sensor Value: ' + sensor.value);
    console.log('-------------');
    console.log('-------------');
  
}

function query_sensors(){
//    var building_id=document.getElementById("drop_down_buildings_id").options[document.getElementById('drop_down_buildings_id').selectedIndex].text;
//    alert(building_id);
    console.log('CALLING query_sensors FUNCTION');
    console.log('Querying Ontology for Sensors');
    sensor_types = new MiniSet();
    sensors = new Array();
//    document.getElementById("historical_data_chart_div").style.display = "block";
//    alert("Querying Sensors");
    
    
    var sensor_id, sensor_type, zone_id, value, x1, y1, z1;
    value = undefined;
    zone_id = undefined;
    x1 = undefined;
    y1 = undefined;
    z1 = undefined;
    var count = 0;
    
    var query = "SELECT ?sensor ?sensor_id ?zone_name "+
        "WHERE{"+
        "?sensor <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#EnergyMeter>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?sensor_id."+
        "?sensor <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isSensorOf> ?zone_id."+
//        "?zone_id <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasRoomNumber> '"+current_activity_zone.id+"'."+
        "?zone_id <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasName> ?zone_name."+
        "}";

    console.log(query);  
    
    var result_object = sparql_query (query);
    
    if(result_object.results.bindings.length!==0)
    {
        sensor_types.add("Energy");
//        console.log(result_object.results.bindings.length);
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
            sensor_id = result_object.results.bindings[i].sensor.value.replace('http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#','');
            zone_id = result_object.results.bindings[i].zone_name.value;
            sensor_type = "Energy";
//            console.log('Sensor ID: ' + sensor_id);
//            console.log('Zone Name: ' + zone_id);

            var temp_sensor = new Sensor(sensor_id, sensor_type, value, zone_id, x1, y1, z1);
//            console.log("Testing "+ temp_sensor.id);
            sensor_array.push(temp_sensor);
            count++;
        }

        console.log('Energy Sensors in Ontology:' + count);
        count = 0;
    }
    
    var query = "SELECT ?sensor ?sensor_id ?zone_name "+
        " WHERE{"+
        "?sensor <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#CO2Sensor>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasName> ?sensor_id."+
        "?sensor <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isSensorOf> ?zone_id."+
        "?zone_id <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasName> ?zone_name."+
        "}";
        
//    alert(query);  
    var result_object = sparql_query (query);
//    alert(result_object.results.bindings.length);
    if(result_object.results.bindings.length!==0)
    {
        
        
        sensor_types.add("CO2");
        sensors.push(sensor_types);
        
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
            sensor_id = result_object.results.bindings[i].sensor_id.value;
            sensor_type = "CO2";//ult_object.results.bindings[i].sensor_type.value;
            zone_id = result_object.results.bindings[i].zone_name.value;
//            console.log('Sensor ID: ' + sensor_id);
//            console.log('Zone ID: ' + zone_id);
//            value = result_object.results.bindings[i].value.value;
//            zone_id = result_object.results.bindings[i].zone_id.value;
//            x = result_object.results.bindings[i].x1.value;
//            y = result_object.results.bindings[i].y1.value;
//            z = result_object.results.bindings[i].z1.value;
//            alert(sensor_id);
            
            var temp_sensor = new Sensor(sensor_id, sensor_type, value, zone_id, x1, y1, z1);
            sensor_array.push(temp_sensor);
            
                        count++;
        }
        console.log('CO2 Sensors in Ontology:' + count);
        count = 0;
//        sensors[sensor_types.length].push(sensor_array);
    }
    var query = "SELECT ?sensor ?sensor_id ?zone_name "+
        " WHERE{"+
        "?sensor <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#LuminanceSensor>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasName> ?sensor_id."+
        "?sensor <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isSensorOf> ?zone_id."+
        "?zone_id <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasName> ?zone_name."+
        "}";
    
    var result_object = sparql_query (query);
//    alert(result_object.results.bindings.length);
    if(result_object.results.bindings.length!==0)
    {

        sensor_types.add("Luminance");
        sensors.push(sensor_types);
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
            sensor_id = result_object.results.bindings[i].sensor_id.value;
            sensor_type = "Luminance";//ult_object.results.bindings[i].sensor_type.value;
            zone_id = result_object.results.bindings[i].zone_name.value;
//            console.log('Sensor ID: ' + sensor_id);
//            console.log('Zone ID: ' + zone_id);
//            value = result_object.results.bindings[i].value.value;
//            zone_id = result_object.results.bindings[i].zone_id.value;
//            x = result_object.results.bindings[i].x1.value;
//            y = result_object.results.bindings[i].y1.value;
//            z = result_object.results.bindings[i].z1.value;
//            alert(sensor_id);
            
            var temp_sensor = new Sensor(sensor_id, sensor_type, value, zone_id, x1, y1, z1);
            sensor_array.push(temp_sensor);
                        count++;
        }
        console.log('Luminance Sensors in Ontology:' + count);
        count = 0;
//        sensors[sensor_types.length].push(sensor_array);
    }
    var query = "SELECT ?sensor ?sensor_id ?zone_name "+
        "WHERE{"+
        "?sensor <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#HumiditySensor>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasName> ?sensor_id."+
        "?sensor <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isSensorOf> ?zone_id."+
        "?zone_id <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasName> ?zone_name."+
        "}";

    //alert(query);  
    
    var result_object = sparql_query (query);
    
    if(result_object.results.bindings.length!==0)
    {
        sensor_types.add("Humidity");

        sensors.push(sensor_types);
        
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
            sensor_id = result_object.results.bindings[i].sensor_id.value;
            sensor_type = "Humidity";//ult_object.results.bindings[i].sensor_type.value;
            zone_id = result_object.results.bindings[i].zone_name.value;
//            console.log('Sensor ID: ' + sensor_id);
//            console.log('Zone ID: ' + zone_id);
//            zone_id = result_object.results.bindings[i].zone_id.value;
//            x = result_object.results.bindings[i].x1.value;
//            y = result_object.results.bindings[i].y1.value;
//            z = result_object.results.bindings[i].z1.value;
//            alert(sensor_id);
            
            var temp_sensor = new Sensor(sensor_id, sensor_type, value, zone_id, x1, y1, z1);
            sensor_array.push(temp_sensor);
            count++;
        }
            console.log('Humidity Sensors in Ontology:' + count);
            count = 0;
//        sensors[sensor_types.length].push(sensor_array);
    }
    
    var query = "SELECT ?sensor ?sensor_id ?zone_name "+
        "WHERE{"+
        "?sensor <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#TemperatureSensor>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasName> ?sensor_id."+
        "?sensor <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isSensorOf> ?zone_id."+
        "?zone_id <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasName> ?zone_name."+
        "}";

    //alert(query);  
    
    var result_object = sparql_query (query);
    
    if(result_object.results.bindings.length!==0)
    {
        sensor_types.add("Temperature");

        sensors.push(sensor_types);
                
        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
            sensor_id = result_object.results.bindings[i].sensor_id.value;
            sensor_type = "Temperature";
            zone_id = result_object.results.bindings[i].zone_name.value;
           
            var temp_sensor = new Sensor(sensor_id, sensor_type, value, zone_id, x1, y1, z1);
            sensor_array.push(temp_sensor);
            count++;
        }
        console.log('Temperature Sensors in Ontology:' + count);
        count = 0;
//        sensors[sensor_types.length].push(sensor_array);
    }
//    display_sensors();

}



function display_sensors(){
    
//    var string;
    console.log('Number of sensors: ' + sensor_array.length);
    for(var i = 0; i<sensor_array.length; i++){
        console.log('Sensor TYPE: ' + sensor_array[i].id);
        console.log('Sensor ID: ' + sensor_array[i].type);
//        string = string + sensor_array[i] + " ";
    }
//    document.getElementById("display_sensor_types_div").innerHTML = string;
//    document.getElementById("display_sensor_types_div").style.display = "block";
}

function display_sensor_types(){
    
    var string;
    for(var i = 0; i<sensor_types.length; i++){
        console.log(sensor_types[i]);
        string = string + sensor_types[i] + " ";
    }
    document.getElementById("display_sensor_types_div").innerHTML = string;
    document.getElementById("display_sensor_types_div").style.display = "block";
}