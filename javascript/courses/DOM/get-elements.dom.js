let my_menu = document.getElementById("menu-1");
console.group("getElementById");
console.log(my_menu);
console.groupEnd();

let my_buttons = document.getElementsByClassName("button");
for (let my_button of Array.from(my_buttons)) {
	console.group("getElementsByClassName");
	console.log(my_button);
	console.groupEnd();
}

let my_inputs = document.getElementsByName("my-name");
for (let my_input of Array.from(my_inputs)) {
	console.group("getElementsByName");
	console.log(my_input);
	console.groupEnd();
}

let my_first_span = document.querySelector("#menu-1 .menuitem span");
console.group("querySelector");
console.log(my_first_span);
console.groupEnd();

let all_span = document.querySelectorAll("#menu-1 .menuitem span");
for (let my_span of Array.from(all_span)) {
	console.group("querySelectorAll");
	console.log(my_span);
	console.groupEnd();
}
