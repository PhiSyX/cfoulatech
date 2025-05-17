import "normalize.css/normalize.css";
import "../public/style.css";

import { pokemons, pokedex } from "../domain/Pokedex.ts";
import { createPokedexUI } from "./pokedex.ts";

createPokedexUI(pokemons, pokedex);
