function demo_tpl(
	data_ignore_after,
	data_unignore_after,
	data_show_after,
	data_hidden_after,
) {
	for (const $data_ignore_after of Array.from(data_ignore_after)) {
		let after = Number($data_ignore_after.dataset.ignoreAfter);
		setTimeout(() => {
			$data_ignore_after.classList.add("code-ignored");
			$data_ignore_after.setAttribute("title", "Ce code n'est pas actif");
		}, after * 1_000);
	}

	for (const $data_unignore_after of Array.from(data_unignore_after)) {
		let after = Number($data_unignore_after.dataset.unignoreAfter);
		$data_unignore_after.classList.add("code-ignored");
		setTimeout(() => {
			$data_unignore_after.classList.remove("code-ignored");
			$data_unignore_after.setAttribute("title", "Ce code est actif");
		}, after * 1_000);
	}

	for (const $data_show_after of Array.from(data_show_after)) {
		$data_show_after.style.visibility = "hidden";
		let after = Number($data_show_after.dataset.showAfter);
		setTimeout(() => {
			$data_show_after.style.visibility = "visible";
		}, after * 1_000);
	}

	for (const $data_hidden_after of Array.from(data_hidden_after)) {
		$data_hidden_after.style.visibility = "visible";
		let after = Number($data_hidden_after.dataset.hiddenAfter);
		setTimeout(() => {
			$data_hidden_after.style.visibility = "hidden";
		}, after * 1_000);
	}

	hljs.highlightAll();
}

let data_ignore_after = document.querySelectorAll("[data-ignore-after]");
let data_unignore_after = document.querySelectorAll("[data-unignore-after]");
let data_show_after = document.querySelectorAll("[data-show-after]");
let data_hidden_after = document.querySelectorAll("[data-hidden-after]");

demo_tpl(
	data_ignore_after,
	data_unignore_after,
	data_show_after,
	data_hidden_after,
);

let demos = document.querySelectorAll(".demo[is]");

for (const $demo of Array.from(demos)) {
	let is = $demo.getAttribute("is");
	/**
	 * @type {HTMLTemplateElement|null}
	 */
	let tpl = document.querySelector(`#${is}`);

	let $reset = $demo.querySelector("button[type='reset']");

	function set_template() {
		let node = tpl.content.cloneNode(true);
		let $output = document.createElement("output");
		$output.append(node);
		$demo.append($output);

		let data_ignore_after = $demo.querySelectorAll("[data-ignore-after]");
		let data_unignore_after = $demo.querySelectorAll(
			"[data-unignore-after]",
		);
		let data_show_after = $demo.querySelectorAll("[data-show-after]");
		let data_hidden_after = $demo.querySelectorAll("[data-hidden-after]");

		demo_tpl(
			data_ignore_after,
			data_unignore_after,
			data_show_after,
			data_hidden_after,
		);
	}

	set_template();

	let timout_idx = 0;

	$reset.addEventListener("click", () => {
		let outputs_el = $demo.querySelectorAll("output");

		for (let $output of outputs_el) {
			$output.style.visibility = "hidden";
		}

		clearTimeout(timout_idx);

		set_template();

		for (let $output of outputs_el) {
			$output.remove();
		}
	});
}
