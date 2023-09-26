<?php
include "db.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Content-Type: application/json');

class PostTask extends DB {
    public function insertTask($title, $description, $due_date) {

        // Prepare the SQL statement using a prepared statement
        $sql = ("INSERT INTO `tasks` (`title`, `description`, `due_date`) VALUES ('$title', '$description', '$due_date')");


        // Bind parameters and execute the statemen
}
}
// Create an instance of the class and use it to insert data
$postTask = new PostTask();
$title = $_POST['title']; // Replace 'title' with the actual field name
$description = $_POST['description']; // Replace 'description' with the actual field name
$due_date = $_POST['due_date']; // Replace 'date' with the actual field name

$result = $postTask->insertTask($title, $description, $due_date);
echo $result;
?>
