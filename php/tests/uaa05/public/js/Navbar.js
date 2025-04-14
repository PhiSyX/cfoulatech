export class Navbar {
	async dropdown() {
		let formations = await fetch("formations.php", {
			headers: {
				'Accept': 'application/json',
			}
		}).then((response) => response.json());

		let $dropdown = document.querySelector(".js-dropdown");
		for (const formation of formations) {
			let $link = document.createElement("a");
			$link.classList.add("navbar-link");
			$link.textContent = formation.intitule;
			$link.href = "formations.php?id=" + formation.id;

			let $li = document.createElement("li");
			$li.append($link);

			$dropdown?.append($li);
		}
	}
}
