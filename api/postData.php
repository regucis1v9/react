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

        if ($decodedData !== null && isset($decodedData['title'], $decodedData['description'], $decodedData['date'])) {
            $title = strip_tags($decodedData['title']);
            $description = strip_tags($decodedData['description']);
            $date = strip_tags($decodedData['date']);


            $sql = "INSERT INTO `tasks`(`title`, `description`, `due_date`, `status`) VALUES ('$title','$description','$date','no')";

            $result = $this->conn->query($sql);

            if ($result === true) {
                echo json_encode(["message" => "Record inserted successfully"]);
            } else {
                echo json_encode(["message" => "Error: " . $this->conn->error]);
            }
        } else {
            echo json_encode(["message" => "Record not inserted successfully"]);
        }
    }
}

// Create an instance of the DataHandler class
$dataHandler = new DataHandler();

// Process the raw POST data
$dataHandler->processData();
?>
