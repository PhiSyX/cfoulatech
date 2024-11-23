import { prompt } from "../utils/prompt.js";
import { write } from "../utils/write.js";

/**
 * Écrit dans le document/terminal après X secondes.
 * @param {string} text - Texte à afficher.
 * @param {number} seconds - Délai en secondes.
 */
function display_message_after_delay(text, seconds) {
    const write_fn = () => write(text);
	setTimeout(write_fn, seconds * 1_000);
}

let user_text = await prompt("Quel est le texte à afficher ?");
let user_secs = Number.parseInt(await prompt("En combien de seconde ?", 1), 10);

display_message_after_delay(user_text, user_secs);
