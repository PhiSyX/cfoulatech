import "../assets/styles/pages/PageNotFound.css";

import React from "react";

export default function PageNotFound()
{
	function gotoBack()
	{
		window.history.back();
	}

	return (
		<div className="page-not-found">
			<button
				type="button"
				onClick={gotoBack}
			>
				Retour
			</button>


			<h1>Page non trouvée</h1>
		</div>
	);
}
