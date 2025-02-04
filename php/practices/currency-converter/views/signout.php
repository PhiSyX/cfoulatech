<?php
require_once "./app/Auth.php";

$auth = new Auth;

if (!$auth->is_connected()) {
	$auth->redirect_signin();
}
?>
<?php include "./views/layouts/header.php"; ?>

<link rel="stylesheet" href="assets/css/signout.css">

<div class="auth-login align-t:center">

<section>
	<p class="align-t:left">
		Hello <strong><?php echo $auth->get_user_session()->get_username(); ?></strong>,
		you are about to log out of your account (<strong><?php echo $auth->get_user_session()->get_email(); ?></strong>)
	</p>

	<form action="?action=logout" method="POST">
		<button type="submit" name="send" class="btn">
			<span>Logout now</span>
		</button>
	</form>
</section>

</div>

<?php include "./views/layouts/footer.php"; ?>
