export function minmax(val, min, max) {
	return Math.min(Math.max(min, val), max);
}

export class Carousel {
	$root;
	$container;
	$previousControl;
	$nextControl;

	#current = 1;
	#total = 0;

	constructor() {
		this.$root = document.querySelector("#js-carousel");
		this.$previousControl = document.querySelector("#js-carousel-prev-control");
		this.$nextControl = document.querySelector("#js-carousel-next-control");
		this.$container = this.$root.querySelector(".carousel-container");
		this.#total = this.$container.childElementCount;

		this.#start(this.#current);
	}

	initEvents() {
		this.$previousControl.addEventListener("click", this.prev);
		this.$nextControl.addEventListener("click", this.next);
	}

	prev = () => {
		this.#current = minmax(1, this.#current - 1, this.#total);
		this.#start(this.#current);
	};

	next = () => {
		this.#current = minmax(1, this.#current + 1, this.#total);
		this.#start(this.#current);
	};

	#start(idx) {
		const posterSrc = document.querySelector(`#js-carousel-poster-${idx}`).href;

		const $carouselItem = this.$root.querySelector(`#js-carousel-item-${idx}`);
		$carouselItem.scrollIntoView({
			behavior: "smooth",
            inline: "center"
		});

		this.$root.style.setProperty("--carousel-img", `url(${posterSrc})`);
	}
}
