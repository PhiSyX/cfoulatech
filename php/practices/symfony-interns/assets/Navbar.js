export class Navbar {
    /**
     * @param {string} path
     * @param {string} selector
     * @returns {Promise<void>}
     */
    async dropdown(path, selector) {
        let items = await fetch(path, {
            headers: {
                'Accept': 'application/json',
            }
        }).then((response) => response.json());

        let $dropdown = document.querySelector(selector);
        for (const item of items) {
            let $link = document.createElement("a");
            $link.classList.add("dropdown-item");
            $link.textContent = item.label;
            $link.href = item.link;

            let $li = document.createElement("li");
            $li.append($link);

            $dropdown?.append($li);
        }
    }
}
