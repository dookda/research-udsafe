<?php
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Connect database
require('../lib/conn.php');
$dbconn = pg_connect($conn_rain) or die('Could not connect'); 

$postdata = file_get_contents("php://input");
if (isset($postdata)) {
    $request = json_decode($postdata);
   
    // $amp = $request->amp;
    // $tam = $request->tam;
    // $vill = $request->vill;
    $mcode = $request->mcode;
    $rain = $request->rain; 
    $date = $request->date;
    $token = mt_rand(100000, 999999);



   $sql = "INSERT INTO rain_community (station_id, rain, raindate) VALUES ( $mcode, $rain, '$date')";
	
    
    pg_query($sql);
        
/*    foreach($request as $item => $value){
        echo $item;
        echo $value;
    }*/

    echo $rain."-".$mcode."-".$date."-".$token.' ส่งข้อมูลสำเร็จ';
}else {
    echo "Not called properly with username parameter!";
}

// Closing connection
    pg_close($dbconn);
?>