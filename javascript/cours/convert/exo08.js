import { prompt } from "../utils/prompt.js";
import { write } from "../utils/write.js";

const sq = (x) => x * x;
let nb = await prompt("Quelle est ton nombre", { cast: "int" });
write(sq(nb));
