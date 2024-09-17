<?php

require_once "../../config.php";

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    http_response_code(405); // Method Not Allowed
    echo '{"error": "This endpoint takes only GET requests."}';
    exit;
}

$result = $mysqli->query('SELECT value FROM Settings WHERE setting = "current_event"')->fetch_assoc()["value"];

$eval = array("current_event" => $result);

echo json_encode($eval);