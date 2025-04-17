import { write } from "../utils/write.js";
import { prompt } from "../utils/prompt.js";

let yearOfBirth = await prompt("Année de naissance", { cast: "int" });
let currentYear = new Date().getFullYear();
write(currentYear - yearOfBirth);
