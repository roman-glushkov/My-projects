<?php
$file_path = __DIR__ . '/data/users.json';

// Получаем данные
$data = json_decode(file_get_contents('php://input'), true);

// Валидация
if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Все поля обязательны']);
    exit;
}

if ($data['password'] !== $data['confirm_password']) {
    http_response_code(400);
    echo json_encode(['error' => 'Пароли не совпадают']);
    exit;
}

// Подготовка данных пользователя
$user = [
    'id' => bin2hex(random_bytes(8)), // Более безопасный ID
    'username' => $data['username'],
    'email' => $data['email'],
    'password' => password_hash($data['password'], PASSWORD_DEFAULT)
];

// Чтение существующих данных
$users = [];
if (file_exists($file_path)) {
    $json_data = file_get_contents($file_path);
    if (!empty($json_data)) {
        $users = json_decode($json_data, true);
    }
}

// Проверка уникальности email
foreach ($users as $u) {
    if ($u['email'] === $user['email']) {
        http_response_code(400);
        echo json_encode(['error' => 'Email уже используется']);
        exit;
    }
}

// Добавление нового пользователя
$users[] = $user;

// Сохранение данных
file_put_contents($file_path, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Успешный ответ
echo json_encode([
    'success' => true,
    'redirect' => 'profile.htm'
]);