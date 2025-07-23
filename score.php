<?php
// score.php - Handle high score operations
header('Content-Type: application/json');

// Enable CORS for local development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'get':
        getHighScore();
        break;
    case 'set':
        setHighScore();
        break;
    case 'reset':
        resetHighScore();
        break;
    default:
        echo json_encode(['error' => 'Invalid action']);
}

function getHighScore() {
    $highScore = $_COOKIE['flappy_high_score'] ?? 0;
    echo json_encode(['highScore' => (int)$highScore]);
}

function setHighScore() {
    $score = $_POST['score'] ?? $_GET['score'] ?? 0;
    $currentHigh = $_COOKIE['flappy_high_score'] ?? 0;
    
    if ($score > $currentHigh) {
        // Set cookie for 1 year
        setcookie('flappy_high_score', $score, time() + (365 * 24 * 60 * 60), '/');
        echo json_encode(['success' => true, 'newHighScore' => (int)$score]);
    } else {
        echo json_encode(['success' => false, 'currentHighScore' => (int)$currentHigh]);
    }
}

function resetHighScore() {
    // Delete the cookie
    setcookie('flappy_high_score', '', time() - 3600, '/');
    echo json_encode(['success' => true, 'message' => 'High score reset']);
}
?>
