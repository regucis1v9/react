<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class sendData extends DB {
    public function selectTask() {
    
            $id = $_GET['id'];
            $role = $_GET['role'];
            
            if($role == 'admin'){
                $sql = "SELECT * FROM `tasks`";
            }else{
                $sql = "SELECT * FROM `tasks` WHERE `userID` = $id";
            }
            $result = $this->conn->query($sql);


        if ($result->num_rows > 0) {
            $tasks = array();
            while ($row = $result->fetch_assoc()) {
                $tasks[] = $row;
            }
            return($tasks);
        }else{
            echo "emmpty";
        }
    }
}

$postTask = new sendData();
echo  json_encode($postTask->selectTask(), JSON_PRETTY_PRINT);
?>
