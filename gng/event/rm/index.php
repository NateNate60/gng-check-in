<?php

require_once "../../config.php";

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    http_response_code(421);
    echo '{"error": "This endpoint takes only GET requests"}';
    exit;
}

if (!array_key_exists("eid", $_GET)) {
    http_response_code(400);
    echo "{}";
    exit;
}

$eid = $_GET["eid"];
$cascade = $_GET["cascade"] ?? "false";

if ($eid == $settings["current_event"]) {
    http_response_code(400);
    echo '{"error": "Cannot delete the current active event. Change the current event before deleting it."}';
    exit;
}

if ($cascade == "true") {
    $sql = $mysqli->prepare("DELETE FROM EventAttendance WHERE event_type = ?");
    $sql->bind_param("i", $eid);
    try {
        $sql->execute();
    } catch (mysqli_sql_exception $e) {
        http_response_code(500);
        echo '{"error": "Internal server error"}';
        exit;
    }
}

$sql = $mysqli->prepare("DELETE FROM Events WHERE event_type = ?");
$sql->bind_param("i", $eid);
try {
    $sql->execute();
    echo '{}';
} catch (mysqli_sql_exception $e) {
    http_response_code(500);
    echo '{"error": "Event has attendance records."}';
}

