/**
 * Composant <UserCard />
 *
 * @param {object} props -- Les propriétés d'un composants
 * @param {string} props.name -- Nom de la personne
 * @param {number} props.age -- Âge de la personne
 * @param {string} props.city -- Ville de la personne
 * @param {string} props.nationality -- Nationalité de la personne
 */
export function UserCard(props) {
	const { age, city, name, nationality } = props;

	return (
		<div className="user-card">
			<p>Nom: <strong>{name}</strong></p>
			<p>Âge: <strong>{age}</strong> ans</p>
			<p>Ville: <strong>{city}</strong></p>
			<p>Nationalité: <strong>{nationality}</strong></p>
		</div>
	);
}
