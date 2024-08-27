<?php

require_once "../config.php";

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405); //Method Not Allowed
    echo "[]";
    exit;
}

if (!array_key_exists("pid", $_GET)) {
    http_response_code(400);
    echo '[]';
    exit;
}

$id = $_GET["pid"];

$sql = $mysqli->prepare("INSERT INTO EventAttendance VALUES (?, CURDATE(), ?)");
$sql->bind_param("si", $id, $settings["current_event"]);

try {
    $sql->execute();
    echo "{}";
    exit;
} catch (mysqli_sql_exception $e) {
    http_response_code(304);
    exit;
}