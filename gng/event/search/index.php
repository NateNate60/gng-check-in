<?php

require_once "../../config.php";

if ($_SERVER['REQUEST_METHOD'] != "GET") {
    http_response_code(421);
    echo '{"error": "This endpoint takes only GET requests."}';
    exit;
}

$filter = strval($_GET["filter"] ?? null);
$type = $_GET["type"] ?? null;
$date = $_GET["date"] ?? null;

if ($filter == null || $type == null || $date == null) {
    http_response_code(400);
    echo '{"error": "One or more parameters is not specified."}';
    exit;
}
$result;
switch ($filter) {
    case "0":
        $result = $mysqli->query("SELECT pid, fname, lname, phone, bday, parent_name,
                                         pokemon_id, mha_id, mtg_id, email FROM Players")->fetch_all();
        break;
    case "1":
        $result = $mysqli->query("SELECT Players.pid, fname, lname, event_date, Events.event_name
                                  FROM EventAttendance INNER JOIN Players 
                                    ON Players.pid = EventAttendance.pid 
                                  INNER JOIN Events
                                    ON Events.event_type = EventAttendance.event_type"
                                );
        $result = $result->fetch_all();
        break;
    case "2":
        $sql = $mysqli->prepare("SELECT Players.pid, fname, lname, event_date, Events.event_name
                                FROM EventAttendance INNER JOIN Players 
                                ON Players.pid = EventAttendance.pid 
                                INNER JOIN Events
                                ON Events.event_type = EventAttendance.event_type
                                WHERE Events.event_type = ?"
                               );
        $sql->bind_param("s", $type);
        $sql->execute();
        $result = $sql->get_result()->fetch_all();
        break;
    case "3":
        $sql = $mysqli->prepare("SELECT Players.pid, fname, lname, event_date, Events.event_name
                                FROM EventAttendance INNER JOIN Players 
                                ON Players.pid = EventAttendance.pid 
                                INNER JOIN Events
                                ON Events.event_type = EventAttendance.event_type
                                WHERE EventAttendance.event_date = ?"
                               );
        $sql->bind_param("s", $date);
        $sql->execute();
        $result = $sql->get_result()->fetch_all();
        break;
    case "4":
        $date = "%". $date ."%";
        $sql = $mysqli->prepare("SELECT Players.pid, fname, lname, event_date, Events.event_name
                                FROM EventAttendance INNER JOIN Players 
                                ON Players.pid = EventAttendance.pid 
                                INNER JOIN Events
                                ON Events.event_type = EventAttendance.event_type
                                WHERE EventAttendance.event_date LIKE ? AND Events.event_type = ?"
                               );
        $sql->bind_param("ss", $date, $type);
        $sql->execute();
        $result = $sql->get_result()->fetch_all();
        break;
    case "5":
        $sql = $mysqli->prepare("SELECT Players.pid, fname, lname, event_date, Events.event_name
                                FROM EventAttendance INNER JOIN Players 
                                ON Players.pid = EventAttendance.pid 
                                INNER JOIN Events
                                ON Events.event_type = EventAttendance.event_type
                                WHERE Players.pid = ?"
                               );
        $sql->bind_param("s", $date);
        $sql->execute();
        $result = $sql->get_result()->fetch_all();
        break;
    default:
        $result = [];
}

$result = array(
    "type" => $filter == "0" ? "players" : "attendance",
    "data" => $result
);

echo json_encode($result);