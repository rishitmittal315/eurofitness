<?php
require_once 'config.php';
require_once 'auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$endpoint = str_replace('/api/', '', $path);

route($method, $endpoint);

function route($method, $endpoint) {
    $parts = explode('/', $endpoint);
    $resource = $parts[0] ?? '';
    $action = $parts[1] ?? '';
    $id = $parts[2] ?? '';

    switch ($resource) {
        case 'memberships':
            handleMemberships($method, $action, $id);
            break;
        case 'diet-plans':
            handleDietPlans($method, $action, $id);
            break;
        case 'trainers':
            handleTrainers($method, $action, $id);
            break;
        case 'about':
            handleAbout();
            break;
        default:
            http_response_code(404);
            echo json_encode(['message' => 'Endpoint not found']);
    }
}

function handleMemberships($method, $action, $id) {
    global $conn;
    
    if ($method === 'GET') {
        $stmt = $conn->query('SELECT * FROM membership_plans');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
}

function handleDietPlans($method, $action, $id) {
    global $conn;
    
    if ($method === 'GET') {
        $stmt = $conn->query('SELECT * FROM diet_plans');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
}

function handleTrainers($method, $action, $id) {
    global $conn;
    
    if ($method === 'GET') {
        $stmt = $conn->query('SELECT id, name, specialization, experience, hourly_rate, rating FROM trainers WHERE is_available = 1');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
}

function handleAbout() {
    echo json_encode([
        'title' => 'About Eurofitness',
        'description' => 'Welcome to Eurofitness, your premier destination for fitness excellence.',
        'mission' => 'Empowering individuals to achieve their fitness goals through expert training and personalized guidance.',
        'vision' => 'To become the most trusted and innovative fitness platform in Europe.'
    ]);
}
?>
