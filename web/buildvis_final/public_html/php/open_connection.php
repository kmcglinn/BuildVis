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

    $hostname = 'phaedrus.scss.tcd.ie:4040';
    $username = $_POST['building_id'];

    $password = $username.'.1';
//    $hostname = 'imi-knoholem.imi.kit.edu';
    
    $tablename = 'datamining';


    $dbhandle = mysql_connect($hostname, $username, $password) 
      or die("Unable to connect to MySQL");
//    echo "Connected to MySQL<br>";

    
?>
