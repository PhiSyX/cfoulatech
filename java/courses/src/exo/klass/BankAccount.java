package exo.klass;

public class BankAccount
{
	private String owner;
	private double balance;

	public BankAccount(String owner, double balance)
	{
		this.owner = owner;
		this.balance = balance;
	}

	public String getOwner()
	{
		return owner;
	}

	public void setOwner(String owner)
	{
		if (owner.isBlank()) {
			System.out.println("Erreur : Le nom ne peut pas être vide");
			return;
		}

		this.owner = owner.trim();
	}

	public double getBalance()
	{
		return balance;
	}

	public void setBalance(double balance)
	{
		if (balance <= 0) {
			System.out.println("Erreur : Le solde ne peut pas être négatif");
			return;
		}

		this.balance = balance;
	}

	@Override
	public String toString()
	{
		//  [Titulaire : titulaire ,
		//Solde : solde]
		return """
			[Titulaire: %s, Solde: %f]
			"""
			.formatted(
				owner,
				balance
			);
	}
}

class BankAccountTest
{
	public static void main(String[] args)
	{
		BankAccount mikeAccount = new BankAccount("Mike S.", 1_000_000);
		System.out.println(mikeAccount.getOwner());
		System.out.println(mikeAccount.getBalance());

		mikeAccount.setOwner(" ");
		mikeAccount.setBalance(0);

		System.out.println(mikeAccount);
	}
}
