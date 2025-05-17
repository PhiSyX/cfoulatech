interface PropsElement {
	children: Array<HTMLElement | string>,
	attrs: Partial<{
		className: Array<string> | string;
		dataset: HTMLElement["dataset"];
		title: { toString(): string }
	}>;
	events: Partial<{
		[K in keyof HTMLElementEventMap]: (e: HTMLElementEventMap[K]) => void;
	}>
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
	if (typeof className === 'string') {
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
				break
			case "string":
				el.setAttribute(key, val);
				break;
		}
	}
	el.append(...props.children || []);

	for (let [eventName, handler] of Object.entries(props.events || {})) {
		// @ts-expect-error
		el.addEventListener(eventName, handler);
	}

	return el;
}

export const button = (props: Props) => h("button", props);
export const li = (props: Props) => h("li", props);
export const span = (text: string, props?: Props) => h("span", {
	...props,
	children: [text, ...props?.children || []],
});

export function changeText(el: HTMLElement | null, text: string): void {
	if (!el) return;
	el.textContent = text;
}

export function changeValue(el: HTMLOutputElement | HTMLInputElement | null, val: {
	toString(): string
}): void {
	if (!el) return;
	el.value = val.toString();
}

export function changeImage(el: HTMLImageElement | null, src: {
	toString(): string
}, alt: { toString(): string } = src) {
	if (!el) return;
	el.src = src.toString();
	el.alt = alt.toString();
}

export function getTemplate(selector: string): HTMLDivElement {
	return (
		document.querySelector<HTMLTemplateElement>(selector)
			?.content?.cloneNode(true) as DocumentFragment
	)?.firstElementChild as HTMLDivElement;
}

export function showElement(el: HTMLElement | null) {
	el?.removeAttribute("hidden");
}

export function hideElement(el: HTMLElement | null) {
	el?.setAttribute("hidden", "hidden");
}

export function changeProgress(el: HTMLProgressElement | null, value: number, max?: number) {
	if (!el) return;
	if (max) el.max = max;
	el.value = value;
}
