import { write } from "../utils/write.js";

let a = 5;
let b = 10;

let temp = a;
a = b;
b = temp;

write(a, b);
