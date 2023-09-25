<?php
include "db.php";

class postTask extends DB {
    public function insertTask($date, $title, $description) {

        $sql = "INSERT INTO `tasks` (`date`, `title`, `description`) VALUES ('$title', '$description', '$date')";
        

        if ($this->conn(query($sql))) {
            return "Data inserted successfully!";
        } else {
            return "Error: " . $stmt->error;
        }

    }
}

// Example usage:
$taskHandler = new postTask();
$result = $taskHandler->insertTask($_POST['date'], $_POST['title'], $_POST['description']);
echo $result;
?>
