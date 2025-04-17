import { write } from "../utils/write.js";
import { prompt } from "../utils/prompt.js";

let val = await prompt("Entre un nombre");
let num = Number(val);
let str = String(num);
write(
	"typeof val =", typeof val,
	"typeof num =", typeof num,
	"typeof str =", typeof str,
);
