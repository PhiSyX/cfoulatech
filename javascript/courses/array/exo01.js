export {};

let tasks = [];
tasks.push("Acheter du pain");
tasks.push("Étudier");
tasks.push("Faire du sport");
console.log(tasks);

tasks = tasks.filter((task) => task !== "Étudier");
console.log(tasks);
