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

            // Fetch the hashed password and user data from the database for the given username
            $sql = "SELECT * FROM users WHERE username = '$username'";

            $result = $this->conn->query($sql);

            if ($result->num_rows === 1) {
                $row = $result->fetch_assoc();
                $hashedPassword = $row['password'];

                // Verify the entered password against the hashed password
                if (password_verify($password, $hashedPassword)) {
                    // Successful login, return user data
                    unset($row['password']); // Remove the password hash from the response
                    echo json_encode(["message" => "Login successful", "user" => $row]);
                } else {
                    echo json_encode(["message" => "Invalid password"]);
                }
            } else {
                echo json_encode(["message" => "User not found"]);
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
 