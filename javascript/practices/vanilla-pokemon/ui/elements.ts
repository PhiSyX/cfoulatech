interface PropsElement {
	children: Array<DocumentFragment | HTMLElement | string>;
	attrs: Partial<{ [p: string]: string } | {
		className: Array<string> | string;
		dataset: HTMLElement["dataset"];
		title: { toString(): string };
	}>;
	events: Partial<{
		[K in keyof HTMLElementEventMap]: (e: HTMLElementEventMap[K]) => void;
	}>;
}

type Props = Partial<PropsElement>;

function h<T extends keyof HTMLElementTagNameMap>(tagName: T, props: Props): HTMLElementTagNameMap[T] {
	let el = document.createElement(tagName);
	let dataset = props.attrs?.dataset || {};
	for (let [key, val] of Object.entries(dataset)) {
		el.setAttribute(`data-${key}`, val!.toString());
	}
	delete props.attrs?.dataset;

	let className = props.attrs?.className;
	if (typeof className === "string") {
		el.classList.add(className);
	} else if (Array.isArray(className)) {
		el.classList.add(...className);
	}
	delete props.attrs?.className;

	for (let [key, val] of Object.entries(props.attrs || {})) {
		switch (typeof val) {
			case "bigint":
			case "number":
				el.setAttribute(key, (val as number).toString());
				break;

			case "boolean":
				el.setAttribute(key, key);
				break;

			case "string":
				el.setAttribute(key, val);
				break;

			case "function":
				el.setAttribute(key, val());
				break;
		}
	}

	el.append(...(props.children || []));

	for (let [eventName, handler] of Object.entries(props.events || {})) {
		// @ts-expect-error
		el.addEventListener(eventName, handler);
	}

	return el;
}

export const fragment = (...els: Array<Node | string>) => {
	let $fragment = document.createDocumentFragment();
	for (let el of els) $fragment.append(el);
	return [$fragment];
};

export const button = (slot: Props["children"], props?: Props) => h("button", { ...props, children: slot });
export const li = (items: Props["children"], props?: Props) => h("li", { ...props, children: items });
export const span = (text: string, props?: Props) => h("span", { ...props, children: [text] });

export function getTemplate(selector: string): HTMLDivElement {
	return (document.querySelector<HTMLTemplateElement>(selector)?.content?.cloneNode(true) as DocumentFragment)
		?.firstElementChild as HTMLDivElement;
}
