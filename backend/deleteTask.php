<?php 
include "db.php";


class deleteTask extends DB{

    public function deleteTask($id) {
        $sql = "DELETE FROM tasks WHERE id = $id";

        $result = $this->conn->query($sql);
    
        if ($result) {
            return true; 
         } else {
            return false; 
        }
    }
   
}
?>