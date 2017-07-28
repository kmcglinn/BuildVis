<?php
/*
 * Author Kris McGlinn, TCD
 * 
 * **ANTON THIS CODE WILL WRITE VALUES TO THE DATA BASE. 
 *  Currently the only funciotn that uses this is 'write_database_values()'
 *  Which is used by the activity modeller to put a lod of occupancy values into the sql database. 
 *  We just need to write a similar function which sets "weight" to a value in the DB depending on our input (a slider)
 *
 * 
 *  $username = 'forum';
    $password = 'forum.1';
 *  $username = 'mediatic';
    $password = 'mediatic.1';
    $hostname = 'imi-knoholem.imi.kit.edu'; 
 * 
 */
    echo "Executing PHP Code \n";
    $timeStamp = $_POST['time'];
    $activity_id = $_POST['id'];
    $activity_type = $_POST['type'];
    $user_id = $_POST['u_id'];
    $zone_id = $_POST['z_id'];
    $value = $_POST['value'];
    echo "Timestamp value= ".$timeStamp."\n";
    echo "Activity_Id value= ".$activity_id."\n";
    echo "Activity_Type value= ".$activity_type."\n";
    echo "User_Id value= ".$user_id."\n";
    echo "Zone_Id value= ".$zone_id."\n";
    echo "Value value= ".$value."\n";

    
//    $username = 'root';
//    $password = '1234';
//    $hostname = 'localhost'; 
//    $username = 'forum';
//    $password = 'forum.1';
    $hostname = 'phaedrus.scss.tcd.ie:4040';
    $username = $_POST['building_id'];

    $password = $username.'.1';
    $tablename = 'activity';
    

    //connection to the database
    $dbhandle = mysql_connect($hostname, $username, $password) 
      or die('Unable to connect to MySQL');
//    echo "Connected to MySQL<br>";
    
    $databasename = $username;
    
    //select a database to work with
    $selected = mysql_select_db($databasename, $dbhandle) 
      or die("Could not select examples");
    
    //INSERT INTO forum.activity VALUES ('2012-07-19 00:00:00', '123', '123', NULL)
    $query = "INSERT INTO $databasename.$tablename VALUES ('$timeStamp', '$activity_type', '$user_id', '$zone_id')";
    
    echo $query."\n";
    $result = mysql_query($query);
    
//    echo "Success!!!";

//        //close the connection
//    mysql_close($dbhandle);
    
?>
