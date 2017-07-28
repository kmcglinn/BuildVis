//function get_details(startTime, endTime, date, sensor_id){
//    startTime = "09:00";
//    endTime = "12:30";
//    date =  "01/03/2012";
//    sensor_id =  "EM1$hasAnalogValue$kWh";
//    $.ajax({
//    type: "POST",
//    url: "http://localhost/highcharts_php_test/php/getDataBaseValues.php",
//    dataType: 'json',
//    data: {sTime:startTime, eTime:endTime, date:date, id:sensor_id}
//    }).done(function( result ) {
//        var mySeries = $.parseJSON(result.time);
//        var mySeries2 = $.parseJSON(result.sensor_value);
////        alert(result.sensor_value);
//        highchart = new Highcharts.Chart({
//            chart: {
//                    renderTo: 'chartViz',
//                    type: 'line',
//                    marginRight: 130,
//                    marginBottom: 25
//            },
//            title: {
//                    text: 'Daily Energy Consumption',
//                    x: -20 //center
//            },
//            subtitle: {
//                    text: 'Media-TIC',
//                    x: -20
//            },
//            xAxis: {
//                    categories: mySeries
//            },
//            yAxis: {
//                    title: {
//                            text: 'KiloWatts Per Hour (kWh)'
//                    },
//                    plotLines: [{
//                            value: 0,
//                            width: 1,
//                            color: '#808080'
//                    }]
//            },
//            tooltip: {
//                    formatter: function() {
//                                    return '<b>'+ this.series.name +'</b><br/>'+
//                                    this.x +': '+ this.y +'kWh';
//                    }
//            },
//            legend: {
//                    layout: 'vertical',
//                    align: 'right',
//                    verticalAlign: 'top',
//                    x: -10,
//                    y: 100,
//                    borderWidth: 0
//            },
//            series: [{
//                    data: mySeries2,
//                    name: sensor_id
//
//            }]
//        });
//        var chart = new Highcharts.Chart(highchart);
////                    chart.redraw();
//    });
//   }
//
