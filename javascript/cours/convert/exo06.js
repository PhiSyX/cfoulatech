import { prompt } from "../utils/prompt.js";
import { write } from "../utils/write.js";

let left_operand = await prompt("Premier nombre", { cast: "int" });
let operator = await prompt("Opérateur  + - * /", { enum: ['+', '-', '*', '/'] });
let right_operand = await prompt("Second nombre", { cast: "int" });

switch (operator) {
	case '+':
		write(left_operand + right_operand);
		break;
	case '-':
		write(left_operand - right_operand);
		break;
	case '*':
		write(left_operand * right_operand);
		break;
	case '/': {
		if (right_operand === 0) {
			write("La division par 0 est interdite");
			break;
		}
		write(left_operand / right_operand);
	}
		break;
}
