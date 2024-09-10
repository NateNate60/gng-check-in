<?php

session_start();
require_once "../../config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); //Method Not Allowed
    exit;
}

$pid = $_POST["pid"] ?? null;
$fname = $_POST["fname"] ?? null;
$lname = $_POST["lname"] ?? null;
$phone = $_POST["phone"] ?? null;
$pokemon_id = $_POST["pokemon_id"] ?? null;
$parent_name = $_POST["parent_name"] ?? null;
$mha_id = $_POST["mha_id"] ?? null;
$birthdate = $_POST["bday"] ?? null;
$email = $_POST["email"] ?? null;
$mtg_id = $_POST["mtg_id"] ?? null;

if ($pid == null || $fname == null || $lname == null || $phone == null || $birthdate == null) { 
    http_response_code(400);
    echo '{"error": "Required field not provided"}';
    exit;
}

$sql = $mysqli->prepare("UPDATE Players SET 
                         fname = ?, lname = ?, phone = ?, 
                         email = ?, bday = ?, parent_name = ?, 
                         pokemon_id = ?, mha_id = ?, mtg_id = ?
                         WHERE pid = ?");
$sql->bind_param("sssssssssi", $fname, $lname, $phone, 
                               $email, $birthdate, $parent_name,
                               $pokemon_id, $mha_id, $mtg_id,
                               $pid);
try {
    $sql->execute();
    echo '{}';
    exit;
} catch (mysqli_sql_exception $e) {
    echo '{"error":'. $e->getMessage() . '}';
    exit;
}