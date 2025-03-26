<?php
require './includes/header.php';

if (!is_connected()) {
	header('Location: login.php');
	die();
}
?>

<div class="box">

    <div class="container__profil">
        <p class="profile"><?= $_SESSION["user"]->firstname ?> <?= $_SESSION["user"]->lastname ?></p>

        <img  src="./assets/img/images.jpg" >


</div>





<?php
    require './includes/footer.php';
?>
