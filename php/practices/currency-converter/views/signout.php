<?php
require_once "./views/Page.php";

class PageSignOut extends Page
{
	public function __construct()
	{
		parent::__construct("signout", "Log Out");
	}
}

$page = new PageSignOut;
$page->required_auth();
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
