<?php
require_once 'config/Database.php';

$database = new Database();
$db = $database->getConnection();

if ($db) {
    echo "SUCCESS: Connected to the database 'mock_interview' perfectly!\n";
} else {
    echo "FAILED: Could not connect to the database.\n";
}
?>
