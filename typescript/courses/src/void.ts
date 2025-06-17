function sayHello(): void {
	console.log("Bonjour");
}

sayHello();

async function asyncFn(): Promise<void> {
	console.log(2);
}

// console.log(1);
// await asyncFn();
// console.log(3);
//
// 1,2,3

// console.log(1);
// void asyncFn();
// console.log(3);
//
// 1,3,2
