<link rel="stylesheet" href="public/css/pages/logout.css">

<section class="logout-page">
	<?php
	$authHelper->useLogoutComponent(
		$dataView["user"]->getUsername(),
		[
			"button" => "Se déconnecter maintenant",
			"label" => true,
		],
	);
	?>
</section>
