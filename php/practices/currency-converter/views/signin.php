<?php
require_once "./app/Page.php";

class PageSignIn extends Page
{
	public function __construct()
	{
		parent::__construct("signin", "Log In");
	}
}

$page = new PageSignIn;
$page->anonymousAuth();
?>
<?php include "./views/layouts/header.php"; ?>

<div class="auth-login align-t:center">
	<h1>Connection</h1>

	<p>Please enter your info to sign in to Mikonvertika</p>

	<ul>
		<li class="btn">
			<a href="#">
				<?php include "./assets/svg/google.svg" ?>
			</a>
		</li>

		<li class="btn">
			<a href="#">
				<?php include "./assets/svg/facebook.svg" ?>
			</a>
		</li>

		<li class="btn">
			<a href="#">
				<?php include "./assets/svg/apple.svg" ?>
			</a>
		</li>
	</ul>

	<hr>

	<form action="?action=login" method="POST">
		<div class="form-group align-t:left">
			<label for="username">Username</label>
			<input id="username" type="text" name="username" placeholder="JohnDoe" value="PhiSyX">
			<?= isset($errors) ? error($errors, "username") : null ?>
		</div>

		<div class="form-group align-t:left">
			<label for="password">Password</label>
			<input id="password" type="password" name="password" placeholder="Secret555" value="123456">
			<?= isset($errors) ? error($errors, "password") : null ?>
		</div>

		<div class="align-t:right">
			<a href="#">Forgot Password ?</a>
		</div>

		<button type="submit" class="btn">
			<span>Log in</span>
		</button>
	</form>

	<p>
		Don't have an account yet ?
		<a href="?page=signup">Sign up</a>
	</p>
</div>

<?php include "./views/layouts/footer.php"; ?>
