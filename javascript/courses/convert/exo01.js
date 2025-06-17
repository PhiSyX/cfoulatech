import { prompt } from "../utils/prompt.js";
import { write } from "../utils/write.js";

let dataType = await prompt("Quelle est ta valeur ?");
write(dataType, typeof dataType);
write(Number(dataType), typeof Number(dataType));
write(Boolean(dataType), typeof Boolean(dataType));
