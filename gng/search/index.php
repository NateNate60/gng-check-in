<?php

session_start();
require_once "../config.php";

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405); //Method Not Allowed
}

if (array_key_exists("query", $_GET)) {
    $query = $_GET["query"];
} else {
    echo "[]";
    exit;
}

if ($query != "" && (strpos($query, "_") === false) && (strpos($query, "%") === false) && $query != ' ') {
    $query = '%' . $query . '%';
    $sql = $mysqli->prepare("SELECT pid, fname, lname, phone FROM Players WHERE CONCAT(fname, ' ', lname) LIKE ? OR phone LIKE ?");
    $sql->bind_param("ss", $query, $query);
    $result_array = array();
    if ($sql->execute()) {
        $result = $sql->get_result();
        $count = 0;
        foreach ($result->fetch_all() as $k=>$v) {
            $count++;
            if ($count > 10) {
                http_response_code(400);
                echo '{"error": "Too many results"}';
                exit;
            }
           
            $player = array(
                "first_name" => $v[1],
                "last_name" => $v[2],
                "phone_last4" => substr($v[3], -4),
                "pid" => $v[0]
            );
            array_push($result_array, $player);
        }
    }
    echo json_encode($result_array);

} else {
    echo "[]";
    exit;
}

