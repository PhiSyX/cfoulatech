class Poisson
{
	private String nom;
	private Sexe sexe;

	public Poisson(String nom, Sexe sexe)
	{
		this.nom = nom;
		this.sexe = sexe;
	}

	public String getNom()
	{
		return nom;
	}

	public Sexe getSexe()
	{
		return sexe;
	}

	@Override
	public String toString()
	{
		return nom + " (" + sexe + ")";
	}
}
