import { Pokemon } from "../app/Pokemon.js";
import { Tortank } from "../app/Tortank.js";
import { Dracaufeu } from "../app/Dracaufeu.js";
import { Lokhlass } from "../app/Lokhlass.js";

let pokemons = [new Tortank(), new Dracaufeu(), new Lokhlass()];

export function createPokemonGame() {
	let $homeScreen = document.querySelector("#home-screen");
	let $formPokemon = $homeScreen.querySelector("form");
	let $ownPokemon = $formPokemon?.elements?.own_pokemon;
	let $opPokemon = $formPokemon?.elements?.op_pokemon;

	for (let pokemon of pokemons) {
		let $selectItemPokemon = document.createElement("option");
		$selectItemPokemon.setAttribute("value", pokemon.name);
		$selectItemPokemon.textContent = pokemon.name;

		$ownPokemon?.append($selectItemPokemon.cloneNode(true));
		$opPokemon?.append($selectItemPokemon);
	}

	$formPokemon?.addEventListener("submit", (evt) => {
		evt.preventDefault();

		$homeScreen.setAttribute("hidden", "");

		gotoBattleScreen(
			pokemons.find((p) => p.name === $ownPokemon.value),
			pokemons.find((p) => p.name === $opPokemon.value),
		);
	});
}

/**
 * @param {Pokemon} ownPokemon
 * @param {Pokemon} opPokemon
 */
function gotoBattleScreen(ownPokemon, opPokemon) {
	let $battleScreen = document.querySelector("#battle-screen");
	$battleScreen.removeAttribute("hidden");

	let $ownPokeform = $battleScreen.querySelector("#own-pokemon");
	let $opPokeform = $battleScreen.querySelector("#op-pokemon");

	// Own
	$ownPokeform.elements.name.value = ownPokemon.name;
	$ownPokeform.elements.hp.value = ownPokemon.hp;

	for (let ownAttack of ownPokemon.getAttackList()) {
		let $attackOption = document.createElement("option");
		$attackOption.setAttribute("value", ownAttack);
		$attackOption.textContent = ownAttack;
		$ownPokeform.elements.attack.append($attackOption);
	}

	// Op
	$opPokeform.elements.name.value = opPokemon.name;
	$opPokeform.elements.hp.value = opPokemon.hp;

	for (let opAttack of opPokemon.getAttackList()) {
		let $attackOption = document.createElement("option");
		$attackOption.setAttribute("value", opAttack);
		$attackOption.textContent = opAttack;
		$opPokeform.elements.attack.append($attackOption);
	}

	function attack(evt, attacker, attacked) {
		evt.preventDefault();

		let attackName = evt.target.elements.attack.value;
		attacker.attack(attackName, attacked);

		if (attacked.alive) {
			$battleScreen
				.querySelector("#messages")
				.append(
					`Au tour de ${attacked.name} de jouer`,
					document.createElement("br"),
				);
		} else {
			$battleScreen
				.querySelector("#messages")
				.append(
					`${attacked.name} est mort, ${attacker.name} a gagné.`,
					document.createElement("br"),
				);
		}
	}

	$opPokeform.addEventListener("submit", (e) =>
		attack(e, opPokemon, ownPokemon),
	);
	$ownPokeform.addEventListener("submit", (e) =>
		attack(e, ownPokemon, opPokemon),
	);
}
