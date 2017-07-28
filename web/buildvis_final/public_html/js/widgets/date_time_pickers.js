
$(function() {
//                    var myDate = new Date();  
//    var todays_date = "";
    $("#monitoring_date_picker").datepicker(
        {
        changeMonth: true,
        changeYear: true}
    );
//    $("#monitoring_date_picker").val(todays_date);
    $('#monitoring_time_picker_start').timepicker();
    $('#monitoring_time_picker_start').timepicker({ 'timeFormat': 'H:i' });
    $('#monitoring_time_picker_end').timepicker();
    $('#monitoring_time_picker_end').timepicker({ 'timeFormat': 'H:i' });
    
});

