<?php
ini_set('display_errors', 1);




$servername = "localhost";
$database = "gng";
$username = "gng";
//$password = "password";
$password = "";
$sql = "mysql:host=$servername;dbname=$database";

try {
    $mysqli = new mysqli($servername, $username, $password, $database);
} catch (Exception $error) {
    echo "Error!\n" . $error->getMessage();
    die();
}

$result = $mysqli->real_query("SELECT * FROM Settings");
$result = $mysqli->use_result();
$settings= array();
foreach ($result as $row) {
    $settings[$row["setting"]] = $row["value"];
}


header("Access-Control-Allow-Origin: *");