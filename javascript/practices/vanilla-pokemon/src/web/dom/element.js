// @ts-nocheck

export const fragment = (children) => {
	let $frament = document.createDocumentFragment();
	$frament.append(...children);
	return $frament;
};

const h = (tagName, children, attributes, events) => {
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
			$el.style[key] = value?.toString();
		}
		delete attributes.style;
	}

	if (attributes) {
		delete attributes?.event;

		for (let [attributeName, attributeValue] of Object.entries(attributes)) {
			$el.setAttribute(attributeName, attributeValue?.toString());
		}
	}

	$el.append(...children);

	if (events) {
		for (let [eventName, handler] of Object.entries(events)) {
			$el.addEventListener(eventName, handler);
		}
	}

	return $el;
};

export const audio = (src, props) => {
	let $el = document.querySelector(`#${props.id}`);
	if (!$el) {
		$el = h("audio", [], props, props?.event);
		$el.src = src;
		document.body.appendChild($el);
	}
	return $el;
};
export const article = (children, props) => h("article", children, props, props?.event);
export const button = (children, props) => h("button", children, props, props?.event);
export const dialog = (children, props) => h("dialog", children, props, props?.event);
export const div = (children, props) => h("div", children, props, props?.event);
export const header = (children, props) => h("header", children, props, props?.event);
export const h1 = (children, props) => h("h1", children, props, props?.event);
export const img = (src, props) => {
	let $el = h("img", [], props, props?.event);
	$el.src = src;
	return $el;
};
export const li = (children, props) => h("li", children, props, props?.event);
export const meter = (value, max, props = {}) => {
	props.optimum ??= max;
	props.low ??= max / 6;
	props.high ??= max / 2;
	props.min ??= 0;
	props.max = max;
	props.value = value;
	return h("meter", [], props, props?.event);
};
export const output = (children, props) => h("output", children, props, props?.event);
export const p = (children, props) => h("p", children, props, props?.event);
export const small = (children, props) => h("small", children, props, props?.event);
export const span = (children, props) => h("span", children, props, props?.event);
export const ul = (children, props) => h("ul", children, props, props?.event);
