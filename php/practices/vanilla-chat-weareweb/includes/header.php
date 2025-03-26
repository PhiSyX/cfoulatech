<?php
require "./database/connection.php";
require "./functions/auth.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>On est ensemble</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
    <link rel="stylesheet" href="css/style.css">

</head>
<body>
    <header class="header">
        <nav class="nav-container">
            <a href="#" class="logo">On est ensemble</a>

            <ul class="nav-menu">
                <li><a href="index.php#" class="nav-link">Accueil</a></li>
				<?php if (is_connected()): ?>
					<li><a href="profil.php" class="nav-link">Profil</a></li>
					<li><a href="chat.php" class="nav-link">Chat</a></li>
				<?php else: ?>
					<li><a href="login.php" class="nav-link">Login</a></li>
				<?php endif ?>
				<?php if (is_connected()): ?>
					<li><a href="logout.php" class="nav-link">Logout</a></li>
				<?php endif ?>
            </ul>

            <div class="mobile-menu">
                <i class="fas fa-bars"></i>
            </div>
        </nav>
    </header>
