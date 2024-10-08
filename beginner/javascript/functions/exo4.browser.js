import { calculate_tva_input } from "./exo4.js";

let user_price_excl = prompt("Quel est votre PRIX (HT)");
let user_tva_rate = prompt("Quel est la TVA?", "21");

let amount = calculate_tva_input(user_price_excl, user_tva_rate);

alert(amount);

export {};
