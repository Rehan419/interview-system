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

if (!isset($_FILES['audio'])) {
    http_response_code(400);
    echo json_encode(["message" => "No file uploaded."]);
    exit();
}

$target_dir = "../../uploads/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

$file_name = uniqid() . "_" . basename($_FILES["audio"]["name"]);
$target_file = $target_dir . $file_name;

if (move_uploaded_file($_FILES["audio"]["tmp_name"], $target_file)) {
    // Optionally save to media_uploads table
    $database = new Database();
    $db = $database->getConnection();
    $interview_id = isset($_POST['interview_id']) ? $_POST['interview_id'] : null;
    
    $query = "INSERT INTO media_uploads (user_id, interview_id, type, file_path) VALUES (:user_id, :interview_id, 'audio', :file_path)";
    $stmt = $db->prepare($query);
    $path = "/backend/uploads/" . $file_name;
    $stmt->bindParam(":user_id", $userData['id']);
    $stmt->bindParam(":interview_id", $interview_id);
    $stmt->bindParam(":file_path", $path);
    $stmt->execute();

    http_response_code(200);
    echo json_encode([
        "message" => "File uploaded successfully.",
        "path" => $path
    ]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Error uploading file."]);
}
?>
