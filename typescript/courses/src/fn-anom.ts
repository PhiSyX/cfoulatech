export const sayHello = function (name: string): string {
	return `Bonjour ${name}`;
}

const sayHello2 = (name: string): string => `Bonjour ${name}`;

console.log(sayHello("Mike"));
console.log(sayHello2("Naëlle"));
