<?php if ($messageHelper->hasSuccess()): ?>
	<div class="alert alert-success">
		<?= $messageHelper->success() ?>
		<span class="alert-close" onclick="this.parentElement.remove()">&times;</span>
	</div>
<?php endif ?>
<?php if ($messageHelper->hasError()): ?>
	<div class="alert alert-error">
		<?= $messageHelper->error() ?>
		<span class="alert-close" onclick="this.parentElement.remove()">&times;</span>
	</div>
<?php endif ?>
