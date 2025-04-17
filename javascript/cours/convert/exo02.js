import { prompt } from "../utils/prompt.js";
import { write } from "../utils/write.js";

let x = await prompt("Quelle est ton nombre premier ?", { cast: "number" });
let y = await prompt("Quelle est ton nombre second ?", { cast: "number" });
let z = x + y;
write(`Résultat: ${z}`);
