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

    $tablename = 'sensormeasurement_update';

    //connection to the database
    $dbhandle = mysql_connect($hostname, $username, $password) 
      or die("Unable to connect to MySQL");
//    echo "Connected to MySQL<br>";

    $sensorName = mysql_real_escape_string($_POST['id']);
    $measurement_type = mysql_real_escape_string($_POST['mType']);

    $databasename = $username;

    
    //select a database to work with
    $selected = mysql_select_db($databasename, $dbhandle) 
      or die("Could not select examples");
    
//    $test = mysql_real_escape_string('mes_point');
    $query = "SELECT value FROM $databasename.$tablename WHERE mes_point='$sensorName'";

//    echo $query;
    
    $result = mysql_query($query);
    
    if (!$result) {
        die('Could not query:' . mysql_error());
    } 
    $row = mysql_fetch_array($result);
    $value = $row['value'];
    echo $value;
//    echo 'Fini';

    //close the connection
    mysql_close($dbhandle);
    
?>
