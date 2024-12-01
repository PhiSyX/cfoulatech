		</main>
	</div>

	<?php include "./includes/components/navigation_per_page.php" ?>

	<?php if (isset($scripts)) : ?>
		<?php foreach ($scripts as $chemin_du_js): ?>
			<script src="<?php echo $chemin_du_js; ?>"></script>
		<?php endforeach ?>
	<?php endif ?>
</body>

</html>
