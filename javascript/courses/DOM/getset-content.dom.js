/**
 * @type {NodeListOf<HTMLInputElement>}
 */
let my_inputs = document.querySelectorAll("[name='my-name']");
/**
 * @type {NodeListOf<HTMLOutputElement>}
 */
let my_outputs = document.querySelectorAll("[name='my-output']");

/**
 * @type {HTMLSpanElement|null}
 */
let my_span = document.querySelector("#my-span");

let my_input = my_inputs[0];
let my_output = my_outputs[0];

function set_input_value() {
	my_input.value = "Hello World";
	my_output.value = my_input.value;
	if (my_span) {
		my_span.innerText = my_input.value;
	}
}

export { set_input_value };
