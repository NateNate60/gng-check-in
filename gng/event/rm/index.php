<?php

require_once "../../config.php";

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    http_response_code(421);
    echo '{"error": "This endpoint takes only GET requests"}';
    exit;
}

if (!array_key_exists("event", $_GET)) {
    http_response_code(400);
    echo "{}";
    exit;
}

$event_type = $_GET["event"];
$cascade = $_GET["cascade"] ?? "false";

if ($cascade == "true") {
    $sql = $mysqli->prepare("DELETE FROM EventAttendance WHERE event_type = ?");
    $sql->bind_param("i", $event_type);
    try {
        $sql->execute();
    } catch (mysqli_sql_exception $e) {
        http_response_code(500);
        echo '{"error": "Internal server error"}';
        exit;
    }
}

$sql = $mysqli->prepare("DELETE FROM Events WHERE event_type = ?");
$sql->bind_param("i", $event_type);
try {
    $sql->execute();
    echo '{}';
} catch (mysqli_sql_exception $e) {
    http_response_code(500);
    echo '{"error": "Event has attendance records."}';
}

