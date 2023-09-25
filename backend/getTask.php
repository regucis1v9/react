<?php 
include "db.php";

class getTasks extends DB{

    public function getTask(){
        $sql = "SELECT * FROM tasks";
        $result = $this->conn->query($sql);
    }
    public function getTaskByID($id){
        $sql = "SELECT * FROM tasks WHERE 'id' = '$id'";
    }
}
?>