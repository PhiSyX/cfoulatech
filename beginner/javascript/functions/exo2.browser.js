import { calculate_rect_area_input } from "./exo2.js";

let user_height_str = prompt("Quelle est votre longueur ? ");
let user_width_str  = prompt("Quelle est votre largeur ? ");

let rect_area = calculate_rect_area_input(user_height_str, user_width_str);

alert(rect_area);

export {};
