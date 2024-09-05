<?php

require_once("../config.php");

if ($_SERVER['REQUEST_METHOD'] != "GET") {
    http_response_code(405); // Method Not Allowed
    echo '{"error": "This endpoint takes only GET requests."}';
    exit;
}

$pid = $_GET["pid"] ?? null;

if ($pid == null) {
    http_response_code(400);
    echo '{"error": "One or more required parameters was not provided."}';
    exit;
}

$sql = $mysqli->prepare("SELECT * FROM Players WHERE pid = ?");
$sql->bind_param("i", $pid);

try {
    $sql->execute();
    $result = $sql->get_result()->fetch_assoc();
    $result = json_encode($result);
    echo $result;
} catch (mysqli_sql_exception $e) {
    http_response_code(500);
    echo '{"error": "' . $e->getMessage() .'"}';
}