<?php
$currentDate = new DateTime('now');
?>
<footer class="l-footer">
	<div class="footer-socials">
		<a href="#">
			<?php include "public/svg/icon-tiktok.svg"; ?>
		</a>

		<a href="#">
			<?php include "public/svg/icon-instagram.svg"; ?>
		</a>

		<a href="#">
			<?php include "public/svg/icon-facebook.svg"; ?>
		</a>

		<a href="#">
			<?php include "public/svg/icon-github.svg"; ?>
		</a>

		<a href="#">
			<?php include "public/svg/icon-linkedin.svg"; ?>
		</a>
	</div>

	<p>
		Nous sommes le
		<time>
			<span
				class="js-days"><?= $currentDate->format('d'); ?></span><span>/</span><span
				class="js-months"><?= $currentDate->format('m'); ?></span><span>/</span><span
				class="js-years"><?= $currentDate->format('Y'); ?></span>
		</time>
		, il est
		<time>
			<span
				class="js-hours"><?= $currentDate->format('H'); ?></span><span>:</span><span
				class="js-minutes"><?= $currentDate->format('i'); ?></span><span>:</span><span
				class="js-seconds"><?= $currentDate->format('s'); ?></span>
		</time>
	</p>

	<script type="module">
		import {DateTime} from "./public/js/DateTime.js";

		let dt = new DateTime('<?= $currentDate->format(DATE_W3C) ?>');
		dt.changeFooterTime();
	</script>
</footer>
