<?php
/*
 * Author Kris McGlinn, TCD
 * 
 * **ANTON THIS CODE WILL READ VALUES FROM THE DATA BASE. The FUNCTION REQUIRES THAT 
 * A SENSOR NAME CORRESPONDING TO ITS ID IS PASSED, HENDRO SHOULD HAVE ALIGNED THESE 
 * I was using a function create_sensor_value_chart in ajax_create_highchart.js to execute this function. 
 * It takes as its parameters, start and end time, date and sensor id. The php code returns a 2D array of values.
 *  $username = 'forum';
    $password = 'forum.1';
 *  $username = 'mediatic';
    $password = 'mediatic.1';
    $hostname = 'imi-knoholem.imi.kit.edu'; (Outside CS Network)
 *  phaedrus.scss.tcd.ie:4040'; (Inside TCD Network)
 * 
 */
//    echo 'TEST';
//    sleep(5);

//    $sensorName = 'PC_002';
//    $thisDate = '02/17/2013';
//    $startTime = '13:00';
//    $endTime = '14:00';
    

//    echo $thisDate;
    
//    $username = 'root';
//    $password = '1234';
//    $hostname = 'localhost'; 
//    $username = 'forum';
//    $password = 'forum.1';
    $hostname = 'phaedrus.scss.tcd.ie:4040';
    $username = $_POST['building_id'];
    $password = $username.'.1';

    $tablename = 'datamining';

        //connection to the database
    $dbhandle = mysql_connect($hostname, $username, $password) 
      or die("Unable to connect to MySQL");
//    echo "Connected to MySQL<br>";

    $sensorName = mysql_real_escape_string($_POST['id']);
    $thisDate = mysql_real_escape_string($_POST['date']);
    $startTime = mysql_real_escape_string($_POST['sTime']);
    $endTime = mysql_real_escape_string($_POST['eTime']);
    $measurement_type = mysql_real_escape_string($_POST['mType']);

    $databasename = $username;
    
    $sensorName = $sensorName.'$hasAnalogValue$'.$measurement_type;
    
    $date_array = explode( '/', $thisDate );
    $thisDate = $date_array[2].'-'.$date_array[0].'-'.$date_array[1];
    
    //select a database to work with
    $selected = mysql_select_db($databasename, $dbhandle) 
      or die("Could not select examples");
    
    $test = mysql_real_escape_string('kno_date$ymd');
    $query = "SELECT $sensorName, kno_time FROM $databasename.$tablename WHERE $test='$thisDate' AND TIME(kno_time) BETWEEN '$startTime' AND '$endTime'";
//    $query = strval($query);
//    
//    $query = "SELECT $sensorName, mes_time FROM $databasename.$tablename WHERE mes_time BETWEEN '$thisDate $startTime:00' AND '$thisDate $endTime:00'";
    
//    echo $query;
    
    $result = mysql_query($query);
       
    $timeValues = array();
    $sensorValues = array();

    while ($row = mysql_fetch_array($result)) {


        $timeValues[] = $row['kno_time'];
        $sensorValues[] = $row[$sensorName];

    }

    echo json_encode(array('time'=>$timeValues,'sensor_value'=>$sensorValues));

    //close the connection
    mysql_close($dbhandle);
    
?>
