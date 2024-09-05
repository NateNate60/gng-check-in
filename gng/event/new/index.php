<?php

require_once "../../config.php";

if ($_SERVER['REQUEST_METHOD'] != "POST") {
    http_response_code(405); // Method Not Allowed
    echo '{"error": "This endpoint takes only POST requests."}';
    exit;
}

$ename = $_POST['ename'] ?? null;

if ($ename == null) {
    http_response_code(400);
    echo '{"error": "One or more required fields is missing."}';
    exit;
}

$sql = $mysqli->prepare('INSERT INTO Events VALUES (0, ?)');
$sql->bind_param('s', $ename);

try {
    $sql->execute();
    echo '{}';
} catch (mysqli_sql_exception $e) {
    http_response_code(500);
    echo '{"error": "' . $e->getMessage() .'"}';
}