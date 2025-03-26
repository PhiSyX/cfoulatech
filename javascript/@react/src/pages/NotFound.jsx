import "../assets/styles/pages/NotFound.css";

import React from "react";

export function NotFound() {
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
