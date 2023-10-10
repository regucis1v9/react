<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Content-Type: application/json');

class DataHandler extends DB {

    public function __construct() {
        parent::__construct();
    }

    public function processData() {

            $id = $_GET['id'];


            $sql = "DELETE FROM `tasks` WHERE `id` = $id";

            $result = $this->conn->query($sql);

            if ($result === true) {
                echo json_encode(["message" => "Record deleted successfully"]);
            } else {
                echo json_encode(["message" => "Error: " . $this->conn->error]);
            }
    }
}

// Create an instance of the DataHandler class
$dataHandler = new DataHandler();

// Process the raw POST data
$dataHandler->processData();
?>
