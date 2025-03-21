export {};

/**
 * @typedef {{
 * 	node:string,
 * 	left?: ANode;
 * 	right?: ANode
 * }} ANode
 */

/**
 * Script
 */

const OperatorPrecedence = {
	DefaultZero: 0,
	AddSub: 1,
	MulDiv: 2,
	Mod: 3,
	Neg: 4,
	Power: 5,
};

const Token = {
	Add: "Add",
	Sub: "Sub",
	Mul: "Mul",
	Div: "Div",
	Caret: "Caret",
	Mod: "Mod",
	LParen: "LParen",
	RParen: "RParen",
	Num: "Num",
	EOF: "EOF",
};

const Node = {
	Add: "Add",
	Sub: "Sub",
	Mul: "Mul",
	Div: "Div",
	Caret: "Caret",
	Mod: "Mod",
	Neg: "Neg",
	Num: "Num",
};

class Tokenizer {
	/**
	 * @param {string} expr
	 */
	constructor(expr) {
		this.expr = Array.from(expr);
	}

	next() {
		let current_ch = this.expr.shift();

		if (current_ch == null) {
			return { type: "EOF" };
		}

		switch (current_ch) {
			case "+":
				return { type: Token.Add };
			case "-":
				return { type: Token.Sub };
			case "*":
				return { type: Token.Mul };
			case "/":
				return { type: Token.Div };
			case "^":
				return { type: Token.Caret };
			case "%":
				return { type: Token.Mod };
			case "(":
				return { type: Token.LParen };
			case ")":
				return { type: Token.RParen };
		}

		if (Number.isSafeInteger(Number.parseInt(current_ch, 10))) {
			let numeric = current_ch;

			while (true) {
				let peek_next_ch = this.expr.at(0);

				if (peek_next_ch == null) {
					break;
				}

				if ([".", ","].includes(peek_next_ch)) {
					this.expr.shift();
					numeric += ".";
				} else if (
					Number.isSafeInteger(Number.parseInt(peek_next_ch, 10))
				) {
					numeric += this.expr.shift();
				} else if (peek_next_ch === "(") {
					return null;
				} else {
					break;
				}
			}

			return Object.freeze({
				type: Token.Num,
				left: Number.parseFloat(numeric),
			});
		}

		return null;
	}
}

class Parser {
	/**
	 * @param {string} expr
	 */
	constructor(expr) {
		let tokenizer = new Tokenizer(expr);

		let current_token = tokenizer.next();

		if (!current_token) {
			throw new Error("Opérateur invalide: caractère invalide #1");
		}

		this.tokenizer = tokenizer;
		this.current_token = current_token;
	}

	/**
	 * @param {typeof Token[keyof typeof Token]} expected
	 */
	check_paren(expected) {
		if (this.current_token.type === expected) {
			this.try_next_token();
		} else {
			throw new Error("Opération invalide: xxx");
		}
	}

	/**
	 * @param {OperatorPrecedence[keyof typeof OperatorPrecedence]} operator_precedence
	 */
	generate_ast(operator_precedence) {
		/**
		 * @param {{type: string}} token
		 */
		const get_operator_precedence = (token) => {
			switch (token.type) {
				case "Add":
				case "Sub":
					return OperatorPrecedence.AddSub;

				case "Mul":
				case "Div":
					return OperatorPrecedence.MulDiv;

				case "Caret":
					return OperatorPrecedence.Power;
				case "Mod":
					return OperatorPrecedence.Mod;

				default:
					return OperatorPrecedence.DefaultZero;
			}
		};

		let left_expression = this.parse_number();

		while (
			operator_precedence < get_operator_precedence(this.current_token)
		) {
			if (this.current_token.type === Token.EOF) {
				break;
			}

			try {
				let right_expression =
					this.try_convert_token_to_node(left_expression);
				left_expression = right_expression;
			} catch {
				break;
			}
		}

		return left_expression;
	}

	parse() {
		return this.generate_ast(OperatorPrecedence.DefaultZero);
	}

	/**
	 * @returns {ANode}
	 */
	parse_number() {
		switch (this.current_token.type) {
			case Token.Sub: {
				this.try_next_token();
				let left_expression = this.generate_ast(OperatorPrecedence.Neg);
				return {
					node: Node.Neg,
					left: left_expression,
				};
			}

			case Token.Num: {
				let i = this.current_token.left;
				this.try_next_token();
				return {
					node: Node.Num,
					left: i,
				};
			}

			case Token.LParen: {
				this.try_next_token();
				let left_expression = this.generate_ast(
					OperatorPrecedence.DefaultZero,
				);
				this.check_paren(Token.RParen);

				if (this.current_token.type === Token.LParen) {
					let right_expression = this.generate_ast(
						OperatorPrecedence.MulDiv,
					);
					return {
						node: Node.Mul,
						left: left_expression,
						right: right_expression,
					};
				}

				return left_expression;
			}

			default:
				throw new Error("Analyse impossible");
		}
	}

	/**
	 * @param {{node:string}} left_expression
	 */
	try_convert_token_to_node(left_expression) {
		switch (this.current_token.type) {
			case Token.Sub:
			case Token.Add: {
				let cur_type = this.current_token.type;
				this.try_next_token();
				let right_expression = this.generate_ast(
					OperatorPrecedence.AddSub,
				);
				return {
					node: cur_type,
					left: left_expression,
					right: right_expression,
				};
			}

			case Token.Div: {
				let cur_type = this.current_token.type;
				this.try_next_token();
				let right_expression = this.generate_ast(
					OperatorPrecedence.MulDiv,
				);
				return {
					node: cur_type,
					left: left_expression,
					right: right_expression,
				};
			}

			case Token.Mul: {
				let cur_type = this.current_token.type;
				this.try_next_token();
				let right_expression = this.generate_ast(
					OperatorPrecedence.MulDiv,
				);
				return {
					node: cur_type,
					left: left_expression,
					right: right_expression,
				};
			}

			case Token.Caret: {
				this.try_next_token();
				let right_expression = this.generate_ast(
					OperatorPrecedence.Power,
				);
				return {
					node: Node.Caret,
					left: left_expression,
					right: right_expression,
				};
			}

			case Token.Mod: {
				this.try_next_token();
				let right_expression = this.generate_ast(
					OperatorPrecedence.Mod,
				);
				return {
					node: Node.Mod,
					left: left_expression,
					right: right_expression,
				};
			}

			default:
				throw new Error(
					`Opération invalide: entrez un opérateur valide ${this.current_token}`,
				);
		}
	}

	try_next_token() {
		let next = this.tokenizer.next();
		if (next == null) {
			throw new Error("Opération invalide: caractère invalide");
		}
		this.current_token = next;
		return next;
	}
}

/**
 * @param {string} expression
 * @throws {Error}
 * @returns {number}
 */
function evaluation(expression) {
	let parser = new Parser(
		expression.replaceAll(" ", "").replaceAll(",", "."),
	);
	let ast = parser.parse();

	/**
	 * @param {ANode} ast
	 * @returns {number}
	 */
	function eval_ast(ast) {
		switch (ast.node) {
			case "Num":
				return ast.left;
			case "Add":
				return eval_ast(ast.left) + eval_ast(ast.right);
			case "Sub":
				return eval_ast(ast.left) - eval_ast(ast.right);
			case "Mul":
				return eval_ast(ast.left) * eval_ast(ast.right);
			case "Div":
				if (ast.right?.left === 0) {
					throw new Error("Division par zéro interdite");
				}
				return eval_ast(ast.left) / eval_ast(ast.right);
			case "Mod":
				return eval_ast(ast.left) % eval_ast(ast.right);
			case "Neg":
				return -eval_ast(ast.left);
			case "Caret":
				return eval_ast(ast.left) ** eval_ast(ast.right);
		}
	}

	return eval_ast(ast);
}

/**
 * @type {HTMLFormElement | null}
 */
let $calc_form = document.querySelector("#calculator form");

/**
 * @type {HTMLInputElement|null}
 */
let $calc_input = document.querySelector("#calculator input");

/**
 * @type {HTMLOutputElement|null}
 */
let $calc_output = document.querySelector("#calculator output");

/**
 * @type {NodeListOf<HTMLButtonElement>}
 */
let $calc_ops = document.querySelectorAll(
	'#calculator .ops button[type="button"]',
);

/**
 * @type {NodeListOf<HTMLButtonElement>}
 */
let $calc_numbers = document.querySelectorAll(
	'#calculator .numbers button[type="button"]',
);

$calc_form?.addEventListener("submit", event_submit_calculator);

for (let $calc_op of Array.from($calc_ops)) {
	$calc_op.addEventListener("click", event_button_add_to_calculator);
}

for (let $calc_number of Array.from($calc_numbers)) {
	$calc_number.addEventListener("click", event_button_add_to_calculator);
}

document.addEventListener("keydown", event_add_to_calculator_with_keyboard);

/**
 * @param {Event} evt - Événement Submit
 * @this {HTMLFormElement}
 */
function event_submit_calculator(evt) {
	evt.preventDefault();

	let data = new FormData(this);
	let full_operation = data.get("full_operation");
	if (!full_operation) {
		alert("Une entrée du formulaire (full_operation) est requise");
		return;
	}

	if (!$calc_output) {
		return;
	}

	try {
		let result = evaluation(full_operation.toString());
		$calc_output.textContent = `Le résultat de ${full_operation} vaut ${result}`;
	} catch (err) {
		alert(`Error: ${err.message}`);
	}
}

/**
 * @param {Event} evt
 * @this {HTMLButtonElement}
 */
function event_button_add_to_calculator(evt) {
	evt.preventDefault();
	add_to_calculator(this.textContent || "");
}

/**
 * @param {{toString(): string}} n
 */
function add_to_calculator(n) {
	if (!$calc_input) {
		return;
	}
	$calc_input.value += n;
}

function remove_number_to_calculator() {
	if (!$calc_input) {
		return;
	}
	$calc_input.value = $calc_input.value.slice(0, -1);
}

/**
 * @param {KeyboardEvent} evt
 */
function event_add_to_calculator_with_keyboard(evt) {
	/**
	 * @type {HTMLElement|null}
	 */
	// @ts-expect-error - HTMLElement|null
	let target = evt.target;

	if (target?.tagName === "INPUT") {
		return;
	}

	switch (evt.code) {
		case "Backspace":
			{
				remove_number_to_calculator();
			}
			return;

		case "Enter":
			return;

		case "Digit0":
		case "Digit1":
		case "Digit2":
		case "Digit3":
		case "Digit4":
		case "Digit5":
		case "Digit6":
		case "Digit7":
		case "Digit8":
		case "Digit9":
			break;

		case "Space":
			{
				if (target?.tagName === "BUTTON") {
					return;
				}
			}
			break;

		default:
			{
				if (evt.shiftKey && evt.key === "/") {
					break;
				}

				if (evt.shiftKey || evt.ctrlKey || evt.key.length > 1) {
					return;
				}
			}
			break;
	}

	evt.preventDefault();

	let number = Number.parseFloat(evt.key);

	if (!Number.isNaN(number)) {
		add_to_calculator(number);
		return;
	}

	add_to_calculator(evt.key);
}
