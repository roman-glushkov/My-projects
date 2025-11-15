<?php
session_start();

// Проверяем авторизацию
if (!isset($_SESSION['user'])) {
    header('Location: login.html');
    exit;
}

$user = $_SESSION['user'];
?>
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CineLog - Добро пожаловать</title>
    <style>
      body {
        font-family: "Inter", sans-serif;
        background-color: #f7f9fb;
        color: #1a2c44;
        text-align: center;
        padding: 50px;
      }
      .welcome-message {
        background-color: #d4edda;
        color: #155724;
        padding: 20px;
        border-radius: 10px;
        max-width: 600px;
        margin: 0 auto 30px;
      }
      .user-info {
        background-color: #e2e3e5;
        padding: 15px;
        border-radius: 8px;
        margin: 20px auto;
        max-width: 400px;
      }
      .btn {
        display: inline-block;
        padding: 12px 24px;
        background-color: #3b5a83;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 500;
        transition: background 0.3s;
      }
      .btn:hover {
        background-color: #2f4867;
      }
    </style>
  </head>
  <body>
    <div class="welcome-message">
      <h1>
        Добро пожаловать,
        <?php echo htmlspecialchars($user['username']); ?>!
      </h1>
      <p>Вы успешно вошли в свой кино-книжный дневник.</p>
    </div>

    <div class="user-info">
      <p>
        Ваш ID:
        <?php echo htmlspecialchars($user['id']); ?>
      </p>
      <p>
        Email:
        <?php echo htmlspecialchars($user['email']); ?>
      </p>
    </div>

    <a href="logout.php" class="btn">Выйти</a>
  </body>
</html>
