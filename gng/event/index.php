<?php

require_once "../config.php";

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    http_response_code(421);
    echo '{"error": "This endpoint takes only GET requests"}';
    exit;
}

$result = json_encode($mysqli->query("SELECT event_type, event_name FROM Events")->fetch_all());

echo $result;