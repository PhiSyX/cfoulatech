import { prompt } from "../utils/prompt.js";
import { write } from "../utils/write.js";
import { rand } from "../utils/random.js";

const Ordering = {
	Less: Symbol(-1),
	Equal: Symbol(0),
	Greater: Symbol(1),
};

/**
 * @param {number} price
 * @param {number} userPrice
 */
function guess(price, userPrice) {
	if (userPrice > price) return Ordering.Greater;
	if (userPrice < price) return Ordering.Less;
	return Ordering.Equal;
}

const JUSTE_PRIX = rand(100);

await prompt(
	`Quel est le Juste prix ? (${JUSTE_PRIX})`,
	{
		cast: "number",
		filter(userPrice) {
			let statePrice = guess(JUSTE_PRIX, userPrice);
			switch (statePrice) {
				case Ordering.Less:
					write("Plus haut");
					break;
				case Ordering.Greater:
					write("Plus bas");
					break;
			}
			return statePrice === Ordering.Equal;
		},
	},
);

write(`Bravo, tu as trouvé le juste prix qui est de ${JUSTE_PRIX}`);

