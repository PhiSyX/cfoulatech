export class Navbar {
    async dropdown() {
        let categories = await fetch("/category/all", {
            headers: {
                'Accept': 'application/json',
            }
        }).then((response) => response.json());

        let $dropdown = document.querySelector(".js-dropdown");
        for (const category of categories) {
            let $link = document.createElement("a");
            $link.classList.add("dropdown-item");
            $link.textContent = category.categoryName;
            $link.href = "/category/" + category.id;

            let $li = document.createElement("li");
            $li.append($link);

            $dropdown?.append($li);
        }
    }
}
