/**
 * Cette fonction récupère les éléments boutons dans le DOM et ajoute des
 * événements aux click pour chaque bouton.
 */
function initialiseEvenements() {
	let addRoomButton = document.querySelector("#add-room");
	let allRoomsButton = document.querySelector("#list-all-rooms");
	let availableRoomsButton = document.querySelector("#list-available-rooms");

	addRoomButton.addEventListener("click", addRoomAction);
	allRoomsButton.addEventListener("click", listAllRoomsAction);
	availableRoomsButton.addEventListener("click", listAvailableRoomsAction);
}

/**
 * Lorsque le bouton "Add a Room" est cliqué
 */
function addRoomAction() {
	alert("J'ai cliqué sur le bouton AddRoom, que faut-il faire maintenant ? À vous de jouer");
}

/**
 * Lorsque le bouton "List all Rooms" est cliqué
 */
function listAllRoomsAction() {
	bonjourCarina();
}

/**
 * Lorsque le bouton "List available Rooms" est cliqué
 */
function listAvailableRoomsAction() {
	bonjourSaif();
}
