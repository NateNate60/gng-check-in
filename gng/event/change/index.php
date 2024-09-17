<?php

require_once "../../config.php";

if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    header("Access-Control-Allow-Methods: PATCH");
    echo '{}';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] != "PATCH") {
    http_response_code(405); // Method Not Allowed
    echo '{"error": "This endpoint takes only PATCH requests."}';
    exit;
}

$eid = $_GET['eid'] ?? null;

if ($eid == null) {
    http_response_code(400);
    echo '{"error": "One or more required fields is missing."}';
    exit;
}

$sql = $mysqli->prepare('UPDATE Settings SET value = ? WHERE setting = "current_event"');
$sql->bind_param('s', $eid);

try {
    $sql->execute();
    echo '{}';
} catch (mysqli_sql_exception $e) {
    http_response_code(500);
    echo '{"error": "' . $e->getMessage() .'"}';
}