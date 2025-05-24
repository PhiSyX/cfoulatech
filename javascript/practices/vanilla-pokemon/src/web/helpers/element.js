/**
 * @param {Children} children
 * @returns {DocumentFragment}
 */
export const fragment = (children) => {
	let $fragment = document.createDocumentFragment();
	$fragment.append(...children);
	return $fragment;
};

/**
 * @param {string} tagName
 * @param {Children} children
 * @param {Attributes} [attributes]
 * @param {Events} [events]
 * @returns {*}
 */
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
		for (let [attributeName, attributeValue] of Object.entries(attributes)) {
			$el.setAttribute(attributeName, attributeValue?.toString());
		}
	}

	/**
	 * @param {Children[number]} child
	 */
	function appendChild(child) {
		if (Array.isArray(child)) {
			appendChildren(child);
			return;
		}

		if (typeof child === "number") {
			child = child.toString();
		}

		$el.append(child);
	}

	/**
	 * @param {Children} children
	 */
	function appendChildren(children) {
		for (let child of children) {
			appendChild(child);
		}
	}

	appendChildren(children);

	if (events) {
		for (let [eventName, handler] of Object.entries(events)) {
			$el.addEventListener(eventName, handler);
		}
	}

	return $el;
};

/**
 * @param {Children} children
 * @param {Attributes} [props]
 * @param {Events} [events]
 * @returns {HTMLDivElement}
 */
export const article = (children, props, events) => h("article", children, props, events);
/**
 * @param {Children} children
 * @param {Attributes} [props]
 * @param {Events} [events]
 * @returns {HTMLHeadingElement}
 */
export const h1 = (children, props, events) => h("h1", children, props, events);
/**
 * @param {Children} children
 * @param {Attributes} [props]
 * @param {Events} [events]
 * @returns {HTMLSpanElement}
 */
export const small = (children, props, events) => h("small", children, props, events);
/**
 * @param {Children} children
 * @param {Attributes} [props]
 * @param {Events} [events]
 * @returns {HTMLOutputElement}
 */
export const output = (children, props, events) => h("output", children, props, events);
/**
 * @param {Children} children
 * @param {Attributes} [props]
 * @param {Events} [events]
 * @returns {HTMLParagraphElement}
 */
export const paragraph = (children, props, events) => h("p", children, props, events);
/**
 * @param {string} src
 * @param {AudioProps & Attributes} props
 * @param {Events} [events]
 * @returns {HTMLAudioElement}
 */
export const audio = (src, props, events) => {
	/**
	 * @type {HTMLAudioElement|null}
	 */
	let $el = document.querySelector(`#${props.id}`);
	if (!$el) {
		/**
		 * @type {HTMLAudioElement}
		 */
		let $audio = h("audio", [], props, events);
		$el = $audio;
		$el.src = src;
		document.body.appendChild($el);
	}
	return $el;
};
/**
 * @param {Children} children
 * @param {Attributes} [props]
 * @param {Events} [events]
 * @returns {HTMLDivElement}
 */
export const div = (children, props, events) => h("div", children, props, events);
/**
 * @param {Children} children
 * @param {Attributes} [props]
 * @param {Events} [events]
 * @returns {HTMLDivElement}
 */
export const header = (children, props, events) => h("header", children, props, events);
/**
 * @param {number} value
 * @param {number} max
 * @param {MeterProps & Attributes} [props]
 * @param {MeterEvents} [events]
 * @returns {HTMLMeterElement}
 */
export const meter = (value, max, props = {value, max}, events = {}) => {
	props.optimum ??= max;
	props.low ??= max / 6;
	props.high ??= max / 2;
	props.min ??= 0;
	props.max ??= max;
	props.value ??= value;
	return h("meter", [], props, events);
};
/**
 * @param {Children} children
 * @param {Attributes} [props]
 * @param {Events} [events]
 * @returns {HTMLUListElement}
 */
export const ul = (children, props, events) => h("ul", children, props, events);
/**
 * @param {string} src
 * @param {Attributes} [props]
 * @param {Events} [events]
 * @returns {HTMLImageElement}
 */
export const img = (src, props, events) => {
	/**
	 * @type {HTMLImageElement}
	 */
	let $el = h("img", [], props, events);
	$el.src = src;
	return $el;
}
/**
 * @param {Children} children
 * @param {Attributes} [props]
 * @param {Events} [events]
 * @returns {HTMLLIElement}
 */
export const li = (children, props, events) => h("li", children, props, events);
/**
 * @param {Children} children
 * @param {Attributes} [props]
 * @param {Events} [events]
 * @returns {HTMLButtonElement}
 */
export const button = (children, props, events) => h("button", children, props, events);
/**
 * @param {Children} children
 * @param {Attributes} [props]
 * @param {Events} [events]
 * @returns {HTMLSpanElement}
 */
export const span = (children, props, events) => h("span", children, props, events);
/**
 * @param {Children} children
 * @param {Attributes} [props]
 * @param {Events} [events]
 * @returns {HTMLDialogElement}
 */
export const dialog = (children, props, events) => h("dialog", children, props, events);

/**
 * @typedef {{toString(): string}} ToString
 * @typedef {Array<Node|HTMLElement|string|number|Array<string>>} Children
 *
 * @typedef {Partial<{className: ToString|Array<ToString>}>} ClassNameAttribute
 * @typedef {Partial<{dataset: Record<string, ToString>}>} DataSetAttribute
 * @typedef {Partial<{hidden: boolean}>} HiddenAttribute
 * @typedef {Partial<{style: Record<string, ToString>}>} StyleAttribute
 * @typedef {ClassNameAttribute & DataSetAttribute & HiddenAttribute & StyleAttribute & {[p: string]: ToString}} Attributes
 *
 * @typedef {{id: string}} AudioProps
 * @typedef {Partial<{optimum:number;low:number;high:number;min:number;max:number;value:number;}>} MeterProps
 * @typedef {Partial<{change: () => void;}>} MeterEvents
 *
 * @typedef {Partial<{[T in keyof HTMLElementEventMap]: (e: HTMLElementEventMap[T]) => void}>} Events
 */
