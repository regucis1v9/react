<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class LoginHandler extends DB {
    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function processLogin() {
        $decodedData = json_decode($this->rawData, true);

        if ($decodedData !== null && isset($decodedData['username'], $decodedData['password'])) {
            $username = strip_tags($decodedData['username']);
            $password = strip_tags($decodedData['password']);

            // Hash the password using a strong hashing algorithm (e.g., bcrypt)
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            // You can perform additional validation and security checks here
            
            // Example SQL query to insert data into a users table
            $sql = "INSERT INTO `users`(`username`, `password`, `role`) VALUES ('$username','$hashedPassword','user')";

            $result = $this->conn->query($sql);

            if ($result === true) {
                echo json_encode(["message" => "Registration successful"]);
            } else {
                echo json_encode(["message" => "Error: " . $this->conn->error]);
            }
        } else {
            echo json_encode(["message" => "Invalid data received"]);
        }
    }
}

// Create an instance of the LoginHandler class
$loginHandler = new LoginHandler();

// Process the raw POST data
$loginHandler->processLogin();
?>
