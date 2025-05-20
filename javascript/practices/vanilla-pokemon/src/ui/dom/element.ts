export const fragment = (children: Array<Node | string>) => {
	let $frament = document.createDocumentFragment();
	$frament.append(...children);
	return $frament;
};

type HChildren = Array<Node | HTMLElement | string>;

type HAttrs = Partial<{
	className: Array<{ toString(): string }> | { toString(): string };
	hidden: boolean;
	dataset: { [key: string]: { toString(): string }; };
	style: { [key: string]: { toString(): string } };
	[k: string]: { toString(): string };
}>;

type HEvent = {
	[K in keyof HTMLElementEventMap]: (e: HTMLElementEventMap[K]) => void;
};

const h = <T extends keyof HTMLElementTagNameMap>(
	tagName: T,
	children: HChildren,
	attributes?: HAttrs,
	events?: HEvent,
) => {
	let $el = document.createElement(tagName);

	if (attributes?.className) {
		if (Array.isArray(attributes.className)) $el.classList.add(...attributes.className);
		else $el.classList.add(attributes.className.toString());
		delete attributes.className;
	}

	if (attributes?.dataset) {
		for (let [key, value] of Object.entries(attributes.dataset)) {
			$el.dataset[key] = value?.toString();
		}
		delete attributes.dataset;
	}

	if (typeof attributes?.hidden !== "undefined") {
		$el.hidden = attributes.hidden;
		delete attributes.hidden;
	}

	if (attributes?.style) {
		for (let [key, value] of Object.entries(attributes.style)) {
			// @ts-expect-error
			$el.style[key] = value?.toString();
		}
		delete attributes.style;
	}

	if (attributes) {
		delete attributes?.event;

		for (let [attributeName, attributeValue] of Object.entries(attributes)) {
			$el.setAttribute(attributeName, attributeValue?.toString()!);
		}
	}

	$el.append(...children);

	if (events) {
		for (let [eventName, handler] of Object.entries(events)) {
			// @ts-expect-error
			$el.addEventListener(eventName, handler);
		}
	}

	return $el;
};

export const article = (
	children: HChildren,
	props?: HAttrs & { event?: HEvent },
) => h("article", children, props, props?.event);

export const h1 = (
	children: HChildren,
	props?: HAttrs & { event?: HEvent },
) => h("h1", children, props, props?.event);

export const small = (
	children: HChildren,
	props?: HAttrs & { event?: HEvent },
) => h("small", children, props, props?.event);

export const output = (
	children: HChildren,
	props?: HAttrs & { event?: HEvent },
) => h("output", children, props, props?.event);

export const p = (
	children: HChildren,
	props?: HAttrs & { event?: HEvent },
) => h("p", children, props, props?.event);

export const audio = (
	src: string,
	props: HAttrs & { event?: HEvent } & { id: string },
) => {

	let $el = document.querySelector<HTMLAudioElement>(`#${props.id}`);
	if (!$el) {
		$el = h("audio", [], props, props?.event);
		$el.src = src;
		document.body.appendChild($el);
	}
	return $el;
};

export const div = (
	children: HChildren,
	props?: HAttrs & { event?: HEvent },
) => h("div", children, props, props?.event);

export const header = (
	children: HChildren,
	props?: HAttrs & { event?: HEvent },
) => h("header", children, props, props?.event);

export const meter = (
	value: number,
	max: number,
	props: HAttrs & { event?: HEvent } = {},
) => {
	props.optimum ??= max;
	props.low ??= max / 6;
	props.high ??= max / 2;
	props.min ??= 0;
	props.max = max;
	props.value = value;
	return h("meter", [], props, props?.event);
};
export const ul = (
	children: HChildren,
	props?: HAttrs & { event?: HEvent },
) => h("ul", children, props, props?.event);

export const img = (
	src: string,
	props?: HAttrs & { event?: HEvent },
) => {
	let $el = h("img", [], props, props?.event);
	$el.src = src;
	return $el;
};

export const li = (
	children: HChildren,
	props?: HAttrs & { event?: HEvent },
) => h("li", children, props, props?.event);

export const button = (
	children: HChildren,
	props?: HAttrs & { event?: HEvent },
) => h("button", children, props, props?.event);

export const span = (
	children: HChildren,
	props?: HAttrs & { event?: HEvent },
) => h("span", children, props, props?.event);
