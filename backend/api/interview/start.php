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

$jwtHandler = new JwtHandler();
$userData = $jwtHandler->authenticate();

if (!$userData) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized access."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->category) && !empty($data->difficulty) && !empty($data->duration)) {
    $database = new Database();
    $db = $database->getConnection();

    // Get category ID
    $cat_query = "SELECT id FROM interview_categories WHERE slug = :slug";
    $cat_stmt = $db->prepare($cat_query);
    $cat_stmt->bindParam(":slug", $data->category);
    $cat_stmt->execute();
    $cat_row = $cat_stmt->fetch(PDO::FETCH_ASSOC);

    if (!$cat_row) {
        http_response_code(404);
        echo json_encode(["message" => "Category not found."]);
        exit();
    }

    $interview_id = uniqid('int_');

    $query = "INSERT INTO interviews (id, user_id, category_id, difficulty, duration) VALUES (:id, :user_id, :category_id, :difficulty, :duration)";
    $stmt = $db->prepare($query);

    $stmt->bindParam(":id", $interview_id);
    $stmt->bindParam(":user_id", $userData['id']);
    $stmt->bindParam(":category_id", $cat_row['id']);
    $stmt->bindParam(":difficulty", $data->difficulty);
    $stmt->bindParam(":duration", $data->duration);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            "message" => "Interview started.",
            "interview_id" => $interview_id
        ]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to start interview."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data."]);
}
?>
