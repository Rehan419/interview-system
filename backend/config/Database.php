<?php
ini_set('display_errors', '0');
error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE & ~E_DEPRECATED);

class Database {
    private $host = "mysql.railway.internal";
    
    private $db_name = "railway";
    private $username = "root";
    private $password = "MkNvRjwbVgSYkTfCxGBcgNsPwujFxbAp";
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            http_response_code(500);
            echo json_encode(["message" => "Database connection error: " . $exception->getMessage()]);
            exit();
        }

        return $this->conn;
    }
}
?>
