<link rel="stylesheet" href="public/css/pages/contact.css">

<section class="contact-page">
	<div class="contact-info">
		<div class="contact-us">
			<h1>Nous contacter</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				Accusamus incidunt ipsum iste itaque non. Aperiam at commodi cum
				deserunt dolore ducimus eius, eveniet illo mollitia natus
				nesciunt odio similique voluptatibus!
			</p>

			<ul>
				<li>
					Envoyez-nous un mail<br>
					<a href="#">contact@example.org</a>
				</li>

				<li>
					Appelez-nous<br>
					<a href="#">(32) 123 45 67 89</a>
				</li>
			</ul>
		</div>

		<div class="contact-help">
			<h2>Besoin d'aide</h2>

			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				Accusamus incidunt ipsum iste itaque non. Aperiam at commodi cum
				deserunt dolore ducimus eius, eveniet illo mollitia natus
				nesciunt odio similique voluptatibus!
			</p>

			<ul>
				<li>
					Carrière<br>
					<a href="#">carrier@example.org</a>
				</li>

				<li>
					Aide et Support<br>
					<a href="#">support@example.org</a>
				</li>
			</ul>
		</div>
	</div>

	<form action="" method="post" class="contact-form">
		<div class="input-group">
			<label for="full-name">Nom complet</label>
			<input type="text" name="full-name" id="full-name"
				<?= $formHelper->inputValueAttribute('full-name') ?>
			>
			<?php $formHelper->error('full-name') ?>
		</div>

		<div class="input-group">
			<label for="email-address">Adresse mail</label>
			<input type="email" name="email-address" id="email-address"
				<?= $formHelper->inputValueAttribute('email-address') ?>
			>
			<?php $formHelper->error('email-address') ?>
		</div>

		<div class="input-group">
			<label for="phone-number">Numéro de téléphone</label>
			<input type="tel" name="phone-number" id="phone-number"
				   <?= $formHelper->inputValueAttribute('phone-number') ?>
			>
			<?php $formHelper->error('phone-number') ?>
		</div>

		<div class="input-group">
			<label for="subject">Sujet</label>
			<input type="text" name="subject" id="subject"
				<?= $formHelper->inputValueAttribute('subject') ?>
			>
			<?php $formHelper->error('subject') ?>
		</div>

		<div class="input-group">
			<label for="message">Message</label>
			<textarea name="message" id="message"><?= $formHelper->inputData('message') ?></textarea>
			<?php $formHelper->error('message') ?>
		</div>

		<button type="submit">Envoyer un message</button>
	</form>
</section>
