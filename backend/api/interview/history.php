<?php
require_once '../../config/Database.php';
require_once '../../helpers/Cors.php';
require_once '../../helpers/JwtHandler.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
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

$database = new Database();
$db = $database->getConnection();

$query = "SELECT i.id, i.difficulty, i.started_at as date, i.score_overall as overall, 
          i.score_communication as communication, i.score_technical as technical, i.score_confidence as confidence,
          i.feedback, c.slug as category 
          FROM interviews i
          JOIN interview_categories c ON i.category_id = c.id
          WHERE i.user_id = :user_id AND i.completed_at IS NOT NULL
          ORDER BY i.completed_at DESC";

$stmt = $db->prepare($query);
$stmt->bindParam(":user_id", $userData['id']);
$stmt->execute();

$history = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    // Structure it like frontend expects
    $history[] = [
        "id" => $row['id'],
        "date" => date('Y-m-d', strtotime($row['date'])),
        "category" => $row['category'],
        "difficulty" => $row['difficulty'],
        "scores" => [
            "communication" => intval($row['communication']),
            "technical" => intval($row['technical']),
            "confidence" => intval($row['confidence']),
            "overall" => intval($row['overall'])
        ],
        "feedback" => [$row['feedback']],
        "questions" => [] // Fetching questions could be a separate query if needed
    ];
}

http_response_code(200);
echo json_encode($history);
?>
