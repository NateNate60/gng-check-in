<?php

require_once("../../config.php");

if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    header("Access-Control-Allow-Methods: DELETE");
    echo '{}';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] != "DELETE") {
    http_response_code(405); // Method not allowed
    echo '{"error": "This endpoint takes only DELETE requests."}';
    exit;
}

$pid = $_GET["pid"] ?? null;

if ($pid == null) {
    http_response_code(400);
    echo '{"error": "One or more required parameters was not provided."}';
    exit;
}

$sql1 = $mysqli->prepare("DELETE FROM EventAttendance WHERE pid = ?");
$sql2 = $mysqli->prepare("DELETE FROM Players WHERE pid = ?");
$sql1->bind_param("i", $pid);
$sql2->bind_param("i", $pid);

try {
    $sql1->execute();
    $sql2->execute();
} catch (mysqli_sql_exception $e) {
    http_response_code(500);
    echo '{"error": "' . $e->getMessage() .'"}';
}

echo '{}';