<?php
/*
 * Author Kris McGlinn, TCD
 * 
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

    $hostname = 'phaedrus.scss.tcd.ie:4040';
    
    $username = $_POST['building_id'];
    $password = $username.'.1';
    $tablename = 'fuzzyrule';

    //connection to the database
    $dbhandle = mysql_connect($hostname, $username, $password) 
      or die("Unable to connect to MySQL");

    $zoneName = mysql_real_escape_string($_POST['id']);
    $weight = mysql_real_escape_string($_POST['weight']);
    $efficiency_target = mysql_real_escape_string($_POST['efficiency_target']);
  
    $databasename = $username;
//    echo $username;
//    echo $password;

    
//    $sensorName = $sensorName.'$hasAnalogValue$'.$measurement_type;
//    echo $sensorName;
//    echo $thisDate;
//    echo $startTime;
//    echo $endTime;
    
//    $date_array = explode( '/', $thisDate );
//    $thisDate = $date_array[2].'-'.$date_array[0].'-'.$date_array[1];
    
    //select a database to work with
    $selected = mysql_select_db($databasename, $dbhandle) 
      or die("Could not select examples");
    
//    $test = mysql_real_escape_string('mes_point');
    $query = "SELECT suggestion FROM $databasename.$tablename WHERE rule_id='RULEID_00001'";

//    echo $query;
    
    $result = mysql_query($query);
    
    if (!$result) {
        die('Could not query:' . mysql_error());
    } 
    $row = mysql_fetch_array($result);
    $value = $row['suggestion'];
    echo $value;
//    echo 'Fini';

    //close the connection
    mysql_close($dbhandle);
    
?>
