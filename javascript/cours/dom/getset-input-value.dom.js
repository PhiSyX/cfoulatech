/**
 * @type {NodeListOf<HTMLInputElement>}
 */
let my_inputs = document.querySelectorAll("[name='my-name']");
let my_input = my_inputs[0];

export function get_input_value() {
	console.log("<input>.value:", my_input.value);
}

export function set_input_value() {
	my_input.value = "Hello World";
}
