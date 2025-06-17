export class User {
	public name: string;
	public gender: string;
	protected birthday: Date;

	constructor(name: string, gender: string, birthday: Date) {
		this.name = name;
		this.gender = gender;
		this.birthday = birthday;
	}

	public getAge(): number {
		const now = new Date();
		let age = now.getFullYear() - this.birthday.getFullYear();

		if (
			now.getMonth() < this.birthday.getMonth() ||
			(
				now.getMonth() === this.birthday.getMonth() &&
				now.getDate() < this.birthday.getDate()
			)
		) {
			age -= 1;
		}

		return age;
	}

	public isAdult() {
		return this.getAge() >= 18;
	}
}

export class Account {
	public user: User;
	private readonly password: string;

	constructor(user: User, password: string) {
		this.user = user;
		this.password = password;
	}

	payer(amount: number): void {
		if (!this.user.isAdult()) {
			let minorTerm = "un mineur";
			let sujetTerm = "il";
			switch (this.user.gender) {
				case "f":
				case "g":
				case "fille":
				case "girl":
				case "female":
				case "femme":
				case "women":
					minorTerm = "une mineure";
					sujetTerm = "elle";
					break;
			}

			console.warn(
				this.user.name,
				`est ${minorTerm} de`,
				`${this.user.getAge()} ans,`,
				`${sujetTerm} ne peut pas payer.`,
			);
			return;
		}

		console.log(this.user.name, `a payé ${amount}€`);
	}
}

let mikeUser = new User("Mike", "m", new Date("1991-12-07"));
let mikeAccount = new Account(
	mikeUser,
	"12345",
);
mikeAccount.payer(19);

let naelleUser = new User("Naelle", "f", new Date("2015-03-12"));
let naelleAccount = new Account(
	naelleUser,
	"12345",
);
naelleAccount.payer(39);
