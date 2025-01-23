<?php

/* TP1:

a. Une Page d'accueil avec comme titre Home avec une image, un titre et une
   petite description. (N'importe quel sujet)

*/

$title = "Home";
$nav = "home";

$styles = ["assets/css/pages/home.css"];

include "./includes/layouts/header.php";
?>

<section id="home-page">
	<img src="./assets/img/logo.png" alt="Logo">

	<article>
		<h1>Bank Root</h1>

		<h2>
			Travailler dans une banque,
			c'est barbant qu'ils disent.
			Ca nous fait rire...
		</h2>

		<p>
			Les Top Employer 2024 ont été annoncés et nous pouvons vous révéler
			que <strong>Bank Root</strong> a été reconnu comme
			Top Employer 2024 de Belgique et ce pour la 10e fois d'affilé.
			Une réussite dont nous pouvons être fiers.
			Et tout cela grâce à nos employés qui contribuent chaque jour à
			faire de <strong>Bank Root</strong> un endroit formidable.
		</p>

		<p>
			Un lieu de travail agréable, un bon équilibre entre vie professionnelle
			et vie privée et de nombreuses possibilités de développement vous
			semblent-ils indispensables dans un emploi ?
			<strong>Alors vous êtes au bon endroit chez Bank Root !</strong>
		</p>
	</article>
</section>

<?php include "./includes/layouts/footer.php" ?>
