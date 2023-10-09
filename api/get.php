<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Content-Type: application/json');

class sendData extends DB {
    public function selectTask() {
        
        $sql = "SELECT * FROM `tasks`";
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
echo  json_encode($postTask->selectTask());
?>
