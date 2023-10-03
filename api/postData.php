<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000/add");
header('Content-Type: application/json');

class DataHandler extends DB {
    private $rawData;

    public function __construct() {
        $this->rawData = file_get_contents('php://input');
    }

    public function processData() {
        // Decode the JSON data
        $decodedData = json_decode($this->rawData, true);

        if ($decodedData !== null && isset($decodedData['title'], $decodedData['description'], $decodedData['date'])) {
            // Extract the data
            $title = $decodedData['title'];
            $description = $decodedData['description'];
            $date = $decodedData['date'];

            // Construct and execute the SQL query
            $sql = "INSERT INTO `tasks`(`title`, `description`, `due_date`, `status`) VALUES ('$title','$description','$date','no')";

            $result = $this->conn->query($sql);

            if ($result === true) {
                echo json_encode(["message" => "Record inserted successfully"]);
            } else {
                echo json_encode(["message" => "Error: " . $this->conn->error]);
            }
        } else {
            // Handle invalid data or missing fields
            echo json_encode(["message" => "Invalid JSON data or missing fields"]);
        }
    }
}

// Create an instance of the DataHandler class
$dataHandler = new DataHandler();

// Process the raw POST data
$dataHandler->processData();
?>
