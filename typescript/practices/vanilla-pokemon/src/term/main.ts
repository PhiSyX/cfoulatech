import { stdin, stdout, exit } from "node:process";
import { createInterface } from "node:readline/promises";
import { GameBattle } from "../domain/GameBattle.ts";
import { MyPokedexStore } from "./stores/MyPokedexStore.ts";
import { MyAttackStore } from "./stores/MyAttackStore.ts";
import { removeRandomArray } from "../shared/helpers.ts";
import { Pokemon } from "../domain/entities/Pokemon.ts";
import { PokemonAttack } from "../domain/entities/PokemonAttack.ts";

let pokedexStore: MyPokedexStore = new MyPokedexStore();
let attackStore: MyAttackStore = new MyAttackStore();

let gameBattle = new GameBattle(
	pokedexStore,
	new MyAttackStore(),
);

let readline = createInterface(stdin, stdout)

let pokedex = pokedexStore.all();
let attacker: Pokemon | null = null;
let opponent = removeRandomArray(pokedex);

console.log(
	`Vous vous apprêtez à affronter le pokémon ${opponent.getName()} (niveau ${opponent.getLevel()})`,
);

while (attacker === null) {
	let userInputPokemon = await readline.question(
		"Choisir votre combattant pokémon entre (tapez « liste » pour afficher tous les pokémons) : ",
	);

	if (userInputPokemon.toLowerCase() === "liste") {
		console.table(
			pokedex.map((p) => {
				return { name: p.getName(), level: p.getLevel() };
			}),
		);
		continue;
	}

	let fighter = pokedex.find((p) => p.getName().toLowerCase() === userInputPokemon.toLowerCase());
	if (!fighter) {
		console.error(`Erreur: ce pokemon ${userInputPokemon} n'existe pas.`);
		exit(1);
	}

	attacker = fighter;
}

console.log(`Vous avez choisi ${attacker.getName()} (niveau: ${attacker.getLevel()}).`);
console.log(`Le combat entre ${attacker.getName()} vs ${opponent.getName()} commence...`);

const whenAlive = (f1: PokemonAttack, f2: Pokemon) => {
	console.log(
		f1.getPokemonName(),
		"a infligé",
		f1.getAttack().calcPower(f1.getPokemon(), f2),
		"de dégâts à",
		f2.getName(),
		", il lui reste",
		f2.getHitPoints(),
		"PV\n",
	);
};

const whenDeathComes = (w: Pokemon, l: Pokemon) => {
	console.log(`${l.getName()} est mort. Le gagnant est ${w.getName()} !)`);
	exit(0);
};

while (true) {
	try {
		let attacks = attackStore.fromPokemon(attacker.getAttacks());
		console.log(`[${attacker.getName()}]: Choisir une attaque `);
		console.table(attacks.map((attack) => {
			return {
				name: attack.getName(),
				power: attack.calcPower(attacker, opponent),
			}
		}));
		let userInputAttack = await readline.question("");
		let attack = attackStore.findByName(userInputAttack.trim(), attacker.getAttacks())!;

		gameBattle.flow(
			new PokemonAttack(attacker, attack),
			opponent,
			{
				alive: whenAlive,
				death: whenDeathComes,
			},
			true,
		);
	} catch (e) {
		if (e.message.indexOf("readline") >= 0) {
			break;
		}

		console.error("Erreur:", e.message, "\n");
	}
}

readline.close();
