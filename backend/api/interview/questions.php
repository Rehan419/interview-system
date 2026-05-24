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

$category_slug = isset($_GET['category']) ? htmlspecialchars(strip_tags($_GET['category'])) : null;
$difficulty = isset($_GET['difficulty']) ? htmlspecialchars(strip_tags($_GET['difficulty'])) : null;



$query = "SELECT q.id, q.type, q.difficulty, q.question, q.expected_answer, c.slug as category 
          FROM interview_questions q 
          JOIN interview_categories c ON q.category_id = c.id
          WHERE 1=1";

if ($category_slug) {
    $query .= " AND c.slug = :category_slug";
}
if ($difficulty) {
    $query .= " AND q.difficulty = :difficulty";
}

$query .= " ORDER BY RAND() LIMIT 10"; // Fetch 10 random questions

$stmt = $db->prepare($query);

if ($category_slug) {
    $stmt->bindParam(":category_slug", $category_slug);
}
if ($difficulty) {
    $stmt->bindParam(":difficulty", $difficulty);
}

$stmt->execute();
$questions = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode($questions);
?>
