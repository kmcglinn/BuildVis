// * Version: 0.1
// * 
// * Date: 18.02.2013
// *  
// * Author: Kris McGlinn
// * 
// * Last Modified: 18/08/13
// * Author: Kris McGlinn
// * 
// * Copyright: 	Knowledge and Data Engineering Group, 
// * 				Department of Computer Science,
// * 				Faculty of Engineering and Systems Science,
// * 				Trinity College
// * 				Dublin 2
// * 				Ireland  
// * 

var main_header_text = "Activiteiten Model Applicatie";

if(current_language===1)
{
    //Languages Dutch

    iActivities = new Array(/*"Toilet",*/ "Printer", "Drinken", "Roken");
    
    handsontable_user_id_text = "Gebruiker I.D.";
    handsontable_room_number_text = "Kamernummer";
    
    no_path_text = "Geen Route";

    monday_text = "Maandag";
    tuesday_text = "Dinsdag";
    wednesday_text = "Woensdag";
    thursday_text = "Donderdag";
    friday_text = "Vrijdag";
    saturday_text = "Zatertag";
    sunday_text = "Zondag";

    begin_text = "Begintijd";
    end_text = "Eindtijd";
    entrance_text = "Ingang";
    exit_text = "Uitgang";
    entrance_route_text = "Ingangsroute";
    exit_route_text = "Uitgangsroute";
    route_text = "Route Naar";
    alt_route_text = "Tergukeer Route";
   
    summary_text = 'Summary';
    location_text = "Plaats";
    path_text = "Route";
    //var return_path_text = "Terguke";

    duration_text = "Duur";

    no_office_alert_string = "You must enter your main activity zone number (e.g. where your office or work desk is located).";

}

else if(current_language===0)
{

    //Languages English
    iActivities = new Array("Toilet", "Printer", "Drink", "Smoke");
    
    main_header_text = "Activity Modeller";

    handsontable_user_id_text = "User I.D.";
    handsontable_room_number_text = "Room R";

    location_text = "Location";
    summary_text = 'Summary';
    path_text = "Path";
    alt_route_text = "Return-Path";
    route_text = "Path";
    no_path_text = "No Path";
        
    duration_text = "Duration";

    monday_text = "Monday";
    tuesday_text = "Tuesday";
    wednesday_text = "Wednesday";
    thursday_text = "Thursday";
    friday_text = "Friday";
    saturday_text = "Saturday";
    sunday_text = "Sunday";

    begin_text = "Start";
    end_text = "End";
    entrance_text = "Entrance";
    exit_text = "Exit";
    entrance_route_text = "Entrance-Path";
    exit_route_text = "Exit-Path";
    
    no_office_alert_string = "You must enter your main activity zone number (e.g. where your office or work desk is located).";
}

else if(current_language===2)
{
    //Language Spanish

    iActivities = new Array("Inodoro", "Impresora", "Beber", "Fumar");
    main_header_text = "Modelador de la actividad";

    handsontable_user_id_text = "I.D. Usuario";
    handsontable_room_number_text = "Zona de Trabajo";

    summary_text = 'Summary';
    location_text = "Ubicacion";
    path_text = "Camino";
    alt_route_text = "Camino de vuelta";
//    no_path_text = "Non Camino";

    duration_text = "Duracion";

    monday_text = "Lunes";
    tuesday_text = "Martes";
    wednesday_text = "Miercoles";
    thursday_text = "Jueves";
    friday_text = "Viernes";
    saturday_text = "Sabado";
    sunday_text = "Domingo";

    begin_text = "Empezar";
    end_text = "Fin";
    entrance_text = "Entrada";
    exit_text = "Salida";
    entrance_route_text = "Camino de entrada";
    exit_route_text = "Camino de vuelta";
    
    no_office_alert_string = "En la Zona de Actividades es obligatoria la introducción de un identificador que se corresponde, por ejemplo, con el numero de zona o el puesto de trabajo dentro de la oficina (ver el mapa).";
}

$(function()
{
    if(current_language===0){
    
        $('#activity_modeller_heading').text(main_header_text);

        $('#user_info_header_id').text('User Identification');
        $('#date_select_header_id').text('Select First Monday of a Week');
        

        //Activity Tabs
        $('#tabs_text_id').text('Your Weekly Activities');

        $('#activity-day-start-end-table-h').text('Day start and end times');
        $('#activity-lunch-table-h').text('Lunch');
        $('#activity-breaks-table-h').text('Other activities');
        $('#activity-meetings-table-h').text('Meetings');

        $('#tabs_1_text_id').text('When does your work day start and end, and which zone do you work?');
        $('#tabs_2_text_id').text('When and where does your lunch break occur?');
        $('#tabs_3_text_id').text('Other activities');
        $('tabs_4_text_id').text('Meetings');
        $('#load_button_text_id').text('Load Activities');
        $('#save_button_text_id').text('Save Activities');

        //Zone Modeller
        $('#zone_modeller_heading').text('Zone Modeller');
        $('#zone_id_text_div').text('Zone I.D.:');
        $('#delete_activity_id').text('Delete Zone');
        $('#load_activity_id').text('Load all Zones');
        $('#zone_type_text_div').text('Zone Type');
        $('#zone_symbolic_value_text_div').text('Symbolic Name');
        
        //Path Modeller
        $('#path_modeller_id').text('Path Modeller');
        $('#path_id_text_div').text('Path I.D.:');
        $('#path_activity_delete_button_div').text('Delete Path');
        $('#path_activity_save_button_div').text('Load all Paths');

        $('#path_activity_type_div').text('Activity Type: ');
        $('#path_activity_add_button_div').text('Add Path to Activity Table');
    }
    if(current_language===1){
    
//        $('#activity_modeller_heading').text('Activiteiten Model Applicatie');
        $('#activity_modeller_heading').text('Activiteiten Model Applicatie');

        $('#user_info_header_id').text('User Identification');
        $('#date_select_header_id').text('Selecteer eerste maandag van een week');
        

        //Activity Tabs
        $('#tabs_text_id').text('Your Weekly Activities');

        $('#activity-day-start-end-table-h').text('Dag begin- en eindtijden.');
        $('#activity-lunch-table-h').text('Lunch');
        $('#activity-breaks-table-h').text('Other activities');
        $('#activity-meetings-table-h').text('Vergaderingen');

        $('#tabs_1_text_id').text('');
        $('#tabs_2_text_id').text('');
        $('#tabs_3_text_id').text('');
        $('#tabs_4_text_id').text('');
        $('#load_button_text_id').text('Laden');
        $('#save_button_text_id').text('Opslaan');

        //Zone Modeller
        $('#zone_modeller_heading').text('Zone Modeller');
        $('#zone_id_text_div').text('Zone I.D.:');
        $('#delete_activity_id').text('Delete Zone');
        $('#load_activity_id').text('Load all Zones');
        $('#zone_type_text_div').text('Zone Type');
        $('#zone_symbolic_value_text_div').text('Symbolic Name');
        
        //Path Modeller
        $('#path_modeller_id').text('Path Modeller');
        $('#path_id_text_div').text('Path I.D.:');
        $('#path_activity_delete_button_div').text('Delete Path');
        $('#path_activity_save_button_div').text('Load all Paths');

        $('#path_activity_type_div').text('Activity Type: ');
        $('#path_activity_add_button_div').text('Add Path to Activity Table');
    }
    if(current_language===2)
    {
        $('#introduction_text').text('La herramienta BuildVis es una herramienta multi-propósito para proporcionar a los usuarios del edificio (gestores de instalaciones y ocupantes) la capacidad para interactuar con el entorno del edificio. Los ocupantes pueden proporcionar datos sobre sus actividades dentro de las zonas y así ayudar a reducir el consumo de energía en el edificio.');

        $('#activity_modeller_heading').text('Modelador de la actividad');
        $('#user_info_header_id').text('Id Usuario');
        $('#date_select_header_id').text('Escoja la fecha');


        //Activity Tabs
        $('#tabs_text_id').text('Sus Actividades Semanales');

        $('#activity-day-start-end-table-h').text('Horas del inicio y fin de la dia');
        $('#activity-lunch-table-h').text('Comida');
        $('#activity-meetings-table-h').text('Reuniones');
        $('#activity-breaks-table-h').text('Otras actividades');

        $('#tabs_1_text_id').text('Horas de comienzo y fin del dia de trabajo incluyendo el camino al puesto de trabajo.');
        $('#tabs_2_text_id').text('Horas de llegada y salida al/del lugar de trabajo.');
        $('#tabs_3_text_id').text('Otras actividades');
        $('#tabs_4_text_id').text('Reuniones');

        $('#load_button_text_id').text('Cargar');
        $('#save_button_text_id').text('Guardar');

        //Zone Modeller
        $('#zone_modeller_heading').text('Modelador de la zona');
//        $('#zone_id_text_div').text('Identificacion de la zona:');
        $('#zone_id_text_div').text('Zona ID:');
        $('#delete_activity_id').text('Suprimir la zona');
        $('#load_activity_id').text('Cargar todas las zonas');
        $('#zone_type_text_div').text('Zone Type');
        $('#zone_symbolic_value_text_div').text('Symbolic Name');

        //Path Modeller
        $('#path_modeller_id').text('Modelador del camino');
        $('#path_id_text_div').text('Identificacion del camino:');
        $('#path_activity_delete_button_div').text('Surprimir el camino');
        $('#path_activity_save_button_div').text('Cargar todos los caminos');

        $('#path_activity_type_div').text('Tipo de actividad: ');
        $('#path_activity_add_button_div').text('Añadir el camino a la tabla de actvidad');
        
        $('#entrance_path_zone_id').text('Entrance Zone: ');
        $('#exit_path_zone_id').text('Exit Zone: ');
        $('#load_path_id').text('Load all Paths');
        $('#delete_path_id').text('Delete Path');
        
    }
    
});


