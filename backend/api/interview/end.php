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

if (!empty($data->interview_id)) {
    $database = new Database();
    $db = $database->getConnection();

    // Verify interview
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

    // Calculate overall score from answers
    $score_query = "SELECT AVG(score) as avg_score FROM interview_answers WHERE interview_id = :id";
    $score_stmt = $db->prepare($score_query);
    $score_stmt->bindParam(":id", $data->interview_id);
    $score_stmt->execute();
    $score_row = $score_stmt->fetch(PDO::FETCH_ASSOC);

    $tech_score = $score_row['avg_score'] ? intval($score_row['avg_score']) : 0;
    
    // Using the user's formula
    // Final Score = (Correct Answers % × 40) + (Communication Score × 25) + (Confidence Score × 15) + (Technical Accuracy × 20)
    // For simplicity here, we simulate communication and confidence based on some dummy metrics or hardcoded for now since no real AI is evaluating it on backend without 3rd party APIs.
    $comm_score = rand(70, 95);
    $conf_score = rand(70, 95);
    $accuracy = $tech_score;
    $correct_pct = $tech_score; 

    $final_score = ($correct_pct * 0.40) + ($comm_score * 0.25) + ($conf_score * 0.15) + ($accuracy * 0.20);
    $final_score = round($final_score);

    $feedback = "Good effort. Keep practicing your technical skills.";
    if ($final_score >= 80) $feedback = "Excellent performance!";
    elseif ($final_score >= 60) $feedback = "Good, but room for improvement.";

    $query = "UPDATE interviews 
              SET completed_at = CURRENT_TIMESTAMP, 
                  score_communication = :comm, 
                  score_technical = :tech, 
                  score_confidence = :conf, 
                  score_overall = :overall,
                  feedback = :feedback
              WHERE id = :id";
    $stmt = $db->prepare($query);

    $stmt->bindParam(":comm", $comm_score);
    $stmt->bindParam(":tech", $tech_score);
    $stmt->bindParam(":conf", $conf_score);
    $stmt->bindParam(":overall", $final_score);
    $stmt->bindParam(":feedback", $feedback);
    $stmt->bindParam(":id", $data->interview_id);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode([
            "message" => "Interview ended.",
            "result" => [
                "communication" => $comm_score,
                "technical" => $tech_score,
                "confidence" => $conf_score,
                "overall" => $final_score,
                "feedback" => $feedback
            ]
        ]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to end interview."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data."]);
}
?>
