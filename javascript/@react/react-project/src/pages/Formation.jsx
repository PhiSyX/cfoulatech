import "../assets/Formation.css";

import { useState } from "react";

export default function Formation() {
	let [stagiaires, setStagiaires] = useState([
		{ id: 1, name: "Mike", status: true },
		{ id: 2, name: "Aïcha", status: false },
	]);

	let [nomStagiaire, setNomStagiaire] = useState("");

	const addStagiaire = () => {
		let stagiaire = {
			id: stagiaires.length + 1,
			name: nomStagiaire,
			status: false,
		};
		setStagiaires((stagiaires) => [...stagiaires, stagiaire]);
	};

	const delStagiaire = (stagiaire) => {
		setStagiaires((stagiaires) =>
			stagiaires.filter((s) => s.id !== stagiaire.id),
		);
	};

	const toggleStatus = (stagiaire) => {
		setStagiaires((stagiaires) =>
			stagiaires.map((s) => {
				if (s.id !== stagiaire.id) return s;
				return { id: s.id, status: !s.status, name: s.name };
			}),
		);
	};

	return (
		<div className="page-formation">
			<div className="container">
				<h1>Gestion des présences - CFITECH</h1>

				<div className="input-group mb-3 border border-primary-subtle" data-bs-theme="dark">
					<input
						type="text"
						className="form-control"
						placeholder="Nom du stagiaire"
						value={nomStagiaire}
						onChange={(e) => setNomStagiaire(e.target.value)}
					/>

					<button
						className="btn btn-dark"
						type="button"
						onClick={addStagiaire}
					>
						Ajouter stagiaire
					</button>
				</div>

				<table className="table">
					<thead className="table-dark">
						<tr>
							<th>Nom du stagiaire</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>

					<tbody className="table-group-divider text-danger">
						{stagiaires.map((stagiaire) => (
							<Stagiaire
								key={stagiaire.id}
								stagiaire={stagiaire}
								delStagiaire={delStagiaire}
								toggleStatus={toggleStatus}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function Stagiaire({ stagiaire, toggleStatus, delStagiaire }) {
	return (
		<tr className={stagiaire.status ? "table-active" : ""}>
			<td>{stagiaire.name}</td>
			<td>{stagiaire.status ? "Présent" : "Absent"}</td>
			<td>
				<button
					className="btn btn-dark"
					type="button"
					onClick={() => toggleStatus(stagiaire)}
				>
					Marquer {stagiaire.status ? "absent" : "présent"}
				</button>
				<button
					className="btn btn-danger"
					type="button"
					onClick={() => delStagiaire(stagiaire)}
				>
					Supprimer
				</button>
			</td>
		</tr>
	);
}
