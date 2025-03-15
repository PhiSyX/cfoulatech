import "../assets/NotFound.css";

export default function NotFound() {
	function gotoBack() {
		history.back();
	}

	return (
		<div className="page-not-found">
			<button
				type="button"
				onClick={gotoBack}
			>
				Goto back
			</button>
		</div>
	);
}
