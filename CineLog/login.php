<?php
session_start();
$file_path = __DIR__ . '/data/users.json';

// Проверяем данные формы
if (empty($_POST['email']) || empty($_POST['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Все поля обязательны']);
    exit;
}

// Читаем пользователей
$users = [];
if (file_exists($file_path)) {
    $json_data = file_get_contents($file_path);
    if (!empty($json_data)) {
        $users = json_decode($json_data, true);
    }
}

// Ищем пользователя по email
$user = null;
foreach ($users as $u) {
    if ($u['email'] === $_POST['email']) {
        $user = $u;
        break;
    }
}

// Проверяем существует ли пользователь
if ($user === null) {
    http_response_code(401);
    echo json_encode(['error' => 'Пользователь с таким email не найден']);
    exit;
}

// Проверяем пароль
if (!password_verify($_POST['password'], $user['password'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Неверный пароль']);
    exit;
}

// Успешная аутентификация
$_SESSION['user'] = $user;
echo json_encode([
    'success' => true,
    'redirect' => 'home.php'
]);