<?php
require_once '../../config/Database.php';
require_once '../../helpers/Cors.php';
require_once '../../helpers/JwtHandler.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->email) && !empty($data->password)) {
    $database = new Database();
    $db = $database->getConnection();

    // Check if email exists
    $check_query = "SELECT id FROM users WHERE email = :email";
    $check_stmt = $db->prepare($check_query);
    $check_stmt->bindParam(":email", $data->email);
    $check_stmt->execute();

    if ($check_stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["message" => "Email already exists."]);
        exit();
    }

    $query = "INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role)";
    $stmt = $db->prepare($query);

    $name = htmlspecialchars(strip_tags($data->name));
    $email = htmlspecialchars(strip_tags($data->email));
    $password = password_hash($data->password, PASSWORD_BCRYPT);
    $role = isset($data->role) ? htmlspecialchars(strip_tags($data->role)) : 'user';

    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $password);
    $stmt->bindParam(":role", $role);

    if ($stmt->execute()) {
        http_response_code(201);
        
        $jwtHandler = new JwtHandler();
        $token = $jwtHandler->encode([
            "id" => $db->lastInsertId(),
            "name" => $name,
            "email" => $email,
            "role" => $role
        ]);
        
        echo json_encode([
            "message" => "User was created.",
            "token" => $token,
            "user" => [
                "id" => $db->lastInsertId(),
                "name" => $name,
                "email" => $email,
                "role" => $role
            ]
        ]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to create user."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Unable to create user. Data is incomplete."]);
}
?>
