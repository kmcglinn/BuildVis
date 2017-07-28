/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Blind_Controller(type, id, setting, percentage_raised, p1X, p1Y, p1Z){
    
    this.type = type;
    this.id = id;
    this.p1X = p1X;
    this.p1Y = p1Y;
    this.p1Z = p1Z;
    this.setting = setting;
    this.percentage_raised = percentage_raised;
        
}

var blind_control_array = new Array();

function createBlindControls(building_id){
    

    blind_control_array = new Array();
    var blind_controller_id, setting, percentage_raised;//, x, y, z;
    var slider_string ="";
    var slider_string_text ="";
    
    blind_controller_id = '001';
    setting = '50';
    percentage_raised = '50';

    slider_string=slider_string+"<span id=\"blind_slider_div_0\"></span>";
    slider_string_text=slider_string_text+"ID: "+blind_controller_id+": <div id=\"blind_slider_text_div_"+i+"\">"+percentage_raised+"</div>";
    var temp_lc = new Blind_Controller("null", blind_controller_id, setting, percentage_raised, "null", "null", "null");
//            console.log(temp_lc.percentage_raised);
    blind_control_array.push(temp_lc);
            
    blind_controller_id = '002';
    setting = '50';
    percentage_raised = '50';

    slider_string=slider_string+"<span id=\"blind_slider_div_1\"></span>";
    slider_string_text=slider_string_text+"ID: "+blind_controller_id+": <div id=\"blind_slider_text_div_"+i+"\">"+percentage_raised+"</div>";
    var temp_lc = new Blind_Controller("null", blind_controller_id, setting, percentage_raised, "null", "null", "null");
//            console.log(temp_lc.percentage_raised);
    blind_control_array.push(temp_lc);

    blind_controller_id = '003';
    setting = '50';
    percentage_raised = '50';

    slider_string=slider_string+"<span id=\"blind_slider_div_2\"></span>";
    slider_string_text=slider_string_text+"ID: "+blind_controller_id+": <div id=\"blind_slider_text_div_"+i+"\">"+percentage_raised+"</div>";
    var temp_lc = new Blind_Controller("null", blind_controller_id, setting, percentage_raised, "null", "null", "null");
//            console.log(temp_lc.percentage_raised);
    blind_control_array.push(temp_lc);
    
    blind_controller_id = '004';
    setting = '50';
    percentage_raised = '50';

    slider_string=slider_string+"<span id=\"blind_slider_div_3\"></span>";
    slider_string_text=slider_string_text+"ID: "+blind_controller_id+": <div id=\"blind_slider_text_div_"+i+"\">"+percentage_raised+"</div>";
    var temp_lc = new Blind_Controller("null", blind_controller_id, setting, percentage_raised, "null", "null", "null");
//            console.log(temp_lc.percentage_raised);
    blind_control_array.push(temp_lc);
        alert(blind_control_array.length);
}
function queryBlindControls(building_id){
    blind_control_array = new Array();
    var blind_controller_id, setting, percentage_raised;//, x, y, z;
    
    var query = "SELECT ?blind_controller_id ?setting ?percentage_raised"+
        " WHERE{"+
        "?blind_controller <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#BlindController>;"+
        "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?blind_controller_id."+
//        "?light_controller  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasBuildingID> "+building_id+"."+ 
        "?blind_controller  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSetting> ?setting."+  
        "?blind_controller  <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isPercentageRaised> ?percentage_raised."+       
        "}";

    console.log(query);  

    var result_object = sparql_query (query);
    var slider_string ="";
    var slider_string_text ="";
    if(result_object.results.bindings.length!==0)
    {

        for(var i = 0; i<result_object.results.bindings.length; i++)
        {
            blind_controller_id = result_object.results.bindings[i].blind_controller_id.value;
            setting = result_object.results.bindings[i].setting.value;
            percentage_raised = result_object.results.bindings[i].percentage_raised.value;
//            x = result_object.results.bindings[i].x1.value;
//            y = result_object.results.bindings[i].y1.value;
//            z = result_object.results.bindings[i].z1.value;
            
            slider_string=slider_string+"<span id=\"blind_slider_div_"+i+"\"></span>";
            slider_string_text=slider_string_text+"ID: "+blind_controller_id+": <div id=\"blind_slider_text_div_"+i+"\">"+percentage_raised+"</div>";
            var temp_lc = new Blind_Controller("null", blind_controller_id, setting, percentage_raised, "null", "null", "null");
//            console.log(temp_lc.percentage_raised);
            blind_control_array.push(temp_lc);
            
            
        }
        
//        console.log(slider_string);
    }
    
    $(function() {
//      document.getElementById("gl_canvas").style.display = "block";
    document.getElementById("b_c_s_slider").innerHTML = slider_string;
    document.getElementById("b_c_s_slider_text").innerHTML = slider_string_text;
    if(setting==="Manual"){
        document.getElementById("b_c_r_2").checked=true;
        document.getElementById("b_c_r_1").checked=false;
    }
    if(setting==="Automated"){
        document.getElementById("b_c_r_1").checked=true;
        document.getElementById("b_c_r_2").checked=false;
    }
//    console.log(blind_control_array.length);
    var count = 0;

//    var id_string = "blind_slider_div_"+count;
        // setup blind controls
    $( "#b_c_s_slider > span" ).each(function() {  

      // read initial values from markup and remove that
      var value = blind_control_array[count].percentage_raised;
      var id_string = "blind_slider_text_div_"+count;
      count++;
      
//      console.log(value);
      $( this ).empty().slider({
        value: value,
        range: "min",
        animate: true,
        orientation: "vertical",
        slide: function( event, ui ) {
//            console.log(ui.value);
            document.getElementById(id_string).innerHTML = ui.value;
//            $( id_string ).val( ui.value );
      }
      });
    });

  });
    

}
function set_percentage_raised(count, percentage_raised){

    console.log(percentage_raised);
    blind_control_array[count].percentage_raised = percentage_raised;

}
function set_blinds_query(){

	// update webgl
	var val = parseFloat (document.getElementById("blind_slider_text_div_0").innerHTML) / 100.0;
	set_blind_y (0, val);
	val = parseFloat (document.getElementById("blind_slider_text_div_1").innerHTML) / 100.0;
	set_blind_y (1, val);
	val = parseFloat (document.getElementById("blind_slider_text_div_2").innerHTML) / 100.0;
	set_blind_y (2, val);
	val = parseFloat (document.getElementById("blind_slider_text_div_3").innerHTML) / 100.0;
	set_blind_y (3, val);
	
//    alert("Hello!");
    for(var i = 0; i<blind_control_array.length; i++){

        var id_string = "blind_slider_text_div_"+i;
        query = "DELETE WHERE{"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+blind_control_array[i].id+">"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> ?id."+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+blind_control_array[i].id+">"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSetting> ?setting."+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+blind_control_array[i].id+">"+
            "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isPercentageRaised> ?pRaised."+
            "}"; 

        console.log(query);     
        result_object = sparql_update (query);
        console.log(JSON.stringify(result_object));
    
        query = "INSERT DATA{ <http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#"+blind_control_array[i].id+">"+
                "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>" +
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#BlindController>; "+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasGuid> \"" + blind_control_array[i].id +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#hasSetting> \"" + blind_control_array[i].setting +"\";"+
                "<http://www.semanticweb.org/ontologies/2012/9/knoholem.owl#isPercentageRaised> \"" + document.getElementById(id_string).innerHTML +"\";"+    
                "}";

        console.log(query);
        result_object = sparql_update (query);
    
//        console.log(JSON.stringify(result_object));

    }

}//END OF FUNCTION
