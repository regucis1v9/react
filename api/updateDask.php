<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Content-Type: application/json');

class DataHandler extends DB {
    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function processData() {
        $decodedData = json_decode($this->rawData, true);

        if ($decodedData !== null && isset($decodedData['id'])) {
            $id = $decodedData['id'];


            // $sql = "DELETE FROM `tasks` WHERE `id` = $id";

            // $result = $this->conn->query($sql);

            // if ($result === true) {
            //     echo json_encode(["message" => "Record inserted successfully"]);
            // } else {
            //     echo json_encode(["message" => "Error: " . $this->conn->error]);
            // }
        } else {

        }
    }
}

// Create an instance of the DataHandler class
$dataHandler = new DataHandler();

// Process the raw POST data
$dataHandler->processData();
?>
