<?php
header('Content-Type: application/json');

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

/* ---------- SAFE INPUT HANDLING ---------- */
$input = file_get_contents("php://input");
$data = json_decode($input);

if (!$data) {
    http_response_code(400);
    echo json_encode([
        "message" => "Invalid JSON body"
    ]);
    exit();
}

/* ---------- REQUIRED FIELDS CHECK ---------- */
if (!empty($data->interview_id) && !empty($data->question_id)) {

    $database = new Database();
    $db = $database->getConnection();

    /* ---------- VERIFY INTERVIEW ---------- */
    $check_query = "SELECT id FROM interviews WHERE id = :id AND user_id = :user_id";
    $check_stmt = $db->prepare($check_query);
    $check_stmt->bindParam(":id", $data->interview_id);
    $check_stmt->bindParam(":user_id", $userData['id']);
    $check_stmt->execute();

    if ($check_stmt->rowCount() == 0) {
        http_response_code(403);
        echo json_encode(["message" => "Invalid interview session."]);
        exit();
    }

    /* ---------- INSERT ANSWER ---------- */
    $query = "INSERT INTO interview_answers 
        (interview_id, question_id, user_answer, audio_path, score) 
        VALUES (:interview_id, :question_id, :user_answer, :audio_path, :score)";

    $stmt = $db->prepare($query);

    $user_answer = isset($data->user_answer) 
        ? htmlspecialchars(strip_tags($data->user_answer)) 
        : "";

    $audio_path = isset($data->audio_path) 
        ? htmlspecialchars(strip_tags($data->audio_path)) 
        : null;

    $score = strlen($user_answer) > 20 ? 80 : 40;

    $stmt->bindParam(":interview_id", $data->interview_id);
    $stmt->bindParam(":question_id", $data->question_id);
    $stmt->bindParam(":user_answer", $user_answer);
    $stmt->bindParam(":audio_path", $audio_path);
    $stmt->bindParam(":score", $score);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "Answer submitted successfully.",
            "score" => $score
        ]);
    } else {
        http_response_code(503);
        echo json_encode([
            "success" => false,
            "message" => "Unable to submit answer."
        ]);
    }

} else {
    http_response_code(400);
    echo json_encode([
        "message" => "Incomplete data (interview_id or question_id missing)"
    ]);
}
?>