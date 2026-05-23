<?php
function verifyToken() {
    $headers = getallheaders();
    $token = str_replace('Bearer ', '', $headers['Authorization'] ?? '');
    
    if (!$token) {
        http_response_code(401);
        die(json_encode(['message' => 'No token provided']));
    }
    
    // JWT verification logic
    return decodeToken($token);
}

function decodeToken($token) {
    // Simple JWT decode (in production, use a proper JWT library)
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        http_response_code(403);
        die(json_encode(['message' => 'Invalid token']));
    }
    
    $payload = json_decode(base64_decode($parts[1]), true);
    return $payload;
}
?>
