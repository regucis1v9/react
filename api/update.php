<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class DataHandler extends DB {
    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function processData() {
        $decodedData = json_decode($this->rawData, true);

        if ($decodedData !== null && isset($decodedData['description'])) {
            $id = $_GET['id'];
            $description = $decodedData['description'];
            $title = $decodedData['title'];

            $sql = "UPDATE `tasks` SET `description`='$description',`title`='$title'  WHERE `id` = $id";

            if ($this->conn->query($sql) === true) {
                echo json_encode(["message" => "Record updated successfully"]);
            } else {
                echo json_encode(["message" => "Error: " . $this->conn->error]);
            }
        } else {
            echo json_encode(["message" => "Invalid data provided"]);
        }
    }
}

// Create an instance of the DataHandler class
$dataHandler = new DataHandler();

// Process the raw POST data
$dataHandler->processData();
?>
